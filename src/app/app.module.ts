import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordComponent } from './components/password/password.component'
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
