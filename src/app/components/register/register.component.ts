import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgeValidatorService } from 'src/app/services/ageValidator.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/passwordGenerator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailMobileRequired = false;
  roles = ['Admin', 'User'];
  gt = 1;
  registerSubscription: Subscription;
  registrationValues: any;

  constructor(private router: Router, private authService: AuthService, private passwordService: PasswordService, private ageValidatorService: AgeValidatorService) { }

  ngOnInit(): void {
    // push the user role value into the rules array from api service

    this.registerForm = new FormGroup({

      'userName': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]),
      'phone': new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      'email': new FormControl(null, [Validators.email]),
      'gender': new FormControl('male'),
      'dob': new FormControl(null, [Validators.required, this.ageValidatorService.ageValidator()]),
      'role': new FormControl(null, [Validators.required]),
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
      //  this.registerSubscription = this.authService.register()
      this.passwordService.generatePassword();
      this.passwordService.password.subscribe(pass => {
        console.log(pass);
        this.registrationValues = this.registerForm.value;
        this.registrationValues.password = pass;
        console.log(this.registrationValues);
      })
      this.router.navigate(['/password'])
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
    const file: File = event.target.files[0];
    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
    }
  }
}
