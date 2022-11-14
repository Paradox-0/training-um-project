import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgeValidatorService } from 'src/app/services/ageValidator.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/passwordGenerator.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  emailMobileRequired = false;
  roles: any;
  //roles: any;
  gt = 1;
  registerSubscription: Subscription;
  userRolesSubscription: Subscription;
  registrationValues: any;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService, private passwordService: PasswordService, private ageValidatorService: AgeValidatorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // push the user role value into the rules array from api service
    this.userRolesSubscription = this.authService.fetchUserRoles().subscribe(userRoles => {
      this.roles = userRoles;
      console.log(userRoles);
    })

    this.registerForm = new FormGroup({

      'userName': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]),
      'phone': new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      'email': new FormControl(null, [Validators.email]),
      'gender': new FormControl('male'),
      'dob': new FormControl(null, [Validators.required, this.ageValidatorService.ageValidator()]),
      'role': new FormControl(2, [Validators.required]),
      'hobbies': new FormArray([new FormControl('')]),
      'profilephoto': new FormControl(null)
    })
  }

  // I am using "registrationValues" variable to send registered user data to server

  onRegisterSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.value.phone === null && this.registerForm.value.email === null) {
      this.emailMobileRequired = true;
      return;
    }
    if (this.registerForm.valid) {
      this.isLoading = true;
      //  this.registerSubscription = this.authService.register()
      this.passwordService.generatePassword();
      this.passwordService.password.subscribe(pass => {
        console.log(pass);
        this.registrationValues = this.registerForm.value;
        this.registrationValues.password = pass;
        console.log(this.registrationValues);
      })
      //this.registrationValues.UserId = '1';
      //this.registrationValues.hobbies = 'nthng';
      //changing date format to d/m/yyyy
      let dd = this.registrationValues.dob.split('/');
      let temp = dd[1];
      dd[1] = dd[0];
      dd[0] = temp;
      console.log(dd.join("/"));
      //FormData api 
      const formData = new FormData();
      //let userId = '1';
      //formData.append("UserId", userId);

      formData.append("Name", this.registrationValues.userName);

      formData.append("MobileNo", this.registrationValues.phone);

      formData.append("Email", this.registrationValues.email);

      formData.append("Gender", this.registrationValues.gender);

      formData.append("DateOfBirth", dd);

      formData.append("Hobbies", this.registrationValues.hobbies);

      formData.append("ProfilePic", this.registrationValues.profilephoto);

      formData.append("Password", this.registrationValues.password);

      formData.append("RoleId", this.registrationValues.role);

      console.log(formData);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ' - ' + pair[1]);
      }
      //sending user registration request
      this.registerSubscription = this.authService.register(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          //toastr for notifying user 
          this.toastr.success('Successfully', 'You have Registered', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            newestOnTop: true
          });
          this.router.navigate(['/password'])
        },
        error: (e) => {
          console.error(e);
          console.log('error_match');
          this.toastr.error('Oops, something went wrong. Please try again later', 'Error');
          //alert('Unable to reach Server');
          this.isLoading = false;
        }
      })
      //redirecting user to password page
      //this.router.navigate(['/password'])
    }
    //
    // let birthdate = this.registerForm.value.dob;
    // let parts = birthdate?.split("/");
    // //if (parts == undefined) { return null; }
    // let dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    // let curDate = new Date();
    // if (curDate.getFullYear() - dtDOB.getFullYear() < 18) {
    //   console.log('age less than 18');
    // }
  }

  // private ageValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let birthdate = control.value;
  //     let parts = birthdate?.split("/");
  //     if (parts == undefined) { return null; }
  //     let dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
  //     let curDate = new Date();
  //     if (curDate.getFullYear() - dtDOB.getFullYear() < 18) {
  //       console.log('age less than 18');
  //       return { 'ageLt': true };
  //     } else if (curDate.getFullYear() - dtDOB.getFullYear() >= 70) {
  //       console.log('Users with age below 70 are allowed')
  //       return { 'ageGt': true };
  //     }
  //     return null;
  //   }
  //   // for age validation 
  // }

  //validation Either email or phone should have value
  private requireOneValue() {
    if (this.registerForm.get('phone')?.value === null && this.registerForm.get('phone')?.value === null) {
      return { required: "At least one of the items is required" }
    }
    return null;
  }



  onAddHobby() {
    if ((<FormArray>this.registerForm.get('hobbies')).controls.length >= 5) {
      return;
    }
    const control = new FormControl(null);
    (<FormArray>this.registerForm.get('hobbies')).push(control); console.log(this.registerForm.value.hobbies);
    console.log("daw");
    this.gt++;
  }

  get controls() {
    return (<FormArray>this.registerForm.get('hobbies')).controls;
  }

  deleteHobby() {
    console.log((<FormArray>this.registerForm.get('hobbies')).controls);
    (<FormArray>this.registerForm.get('hobbies')).controls.pop();
    console.log(this.registerForm.value.hobbies.length);
    this.gt--;
  }


  fileName = "";
  onFileSelected(event: any) {
    const file: File = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    //console.log(event.target.files);
    if (file) {

      this.fileName = file.name;

      // const formData = new FormData();
      // formData.append("thumbnail", file, this.fileName);

      this.registerForm.patchValue({
        'profilephoto': file
      });
    }
  }

  ngOnDestroy(): void {

    if (this.registerSubscription) {
      this.registerSubscription.add(this.userRolesSubscription);
      this.registerSubscription.unsubscribe();
    }
    //below method also works for unsubscription and does not throw an undefined error as it were in above case without if condition

    //this.userRolesSubscription.add(this.registerSubscription);
    //this.userRolesSubscription.unsubscribe();
  }


}
