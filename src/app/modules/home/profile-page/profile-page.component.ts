import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgeValidatorService } from 'src/app/services/ageValidator.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  //profilePic: string = '../../../assets/defaultProfile.png';
  profilePic: string = 'assets/defaultProfile.png';
  profilePageForm: FormGroup;
  gt = 1;
  roles = ['User'];

  constructor(private ageValidatorService: AgeValidatorService) { }

  ngOnInit(): void {
    this.profilePageForm = new FormGroup({

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


  onProfileUpdate() {

  }


  onAddHobby() {
    if ((<FormArray>this.profilePageForm.get('hobbies')).controls.length >= 5) {
      return;
    }
    const control = new FormControl(null);
    (<FormArray>this.profilePageForm.get('hobbies')).push(control); console.log(this.profilePageForm.value.hobbies);
    console.log("daw");
    this.gt++;
  }

  get controls() {
    return (<FormArray>this.profilePageForm.get('hobbies')).controls;
  }

  deleteHobby() {
    console.log((<FormArray>this.profilePageForm.get('hobbies')).controls);
    (<FormArray>this.profilePageForm.get('hobbies')).controls.pop();
    console.log(this.profilePageForm.value.hobbies.length);
    this.gt--;
  }

  // profile picture custom
  fileName = "";
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      const formData = new FormData();
      console.log(file);
      formData.append("profilePic", file, this.fileName);
      this.profilePageForm.patchValue({
        // 'profilephoto': file
        'profilephoto': formData
      })
      console.log(this.profilePageForm.value);
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePic = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

}
