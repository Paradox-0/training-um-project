import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log(response);
          console.log(this.loginForm.value);
          this.router.navigate(['home']);
        },
        error: (e) => {
          console.error(e);
          console.log('Login Error');
          alert('Login Error occured')
        }
      })
    }
  }

}
