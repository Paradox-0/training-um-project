import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  loginSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginSubscription = this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log(response);
          console.log(this.loginForm.value);
          this.isLoading = false;
          this.router.navigate(['home']);
        },
        error: (e) => {
          console.error(e);
          console.log('Login Error');
          this.toastr.error(e, 'Error');
          //alert('Login Error occured');
          this.isLoading = false;
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
