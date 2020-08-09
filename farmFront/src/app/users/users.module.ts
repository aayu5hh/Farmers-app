import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import{RequestInterceptor} from'../request.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'signup', pathMatch: 'Full'},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }]
})
export class UsersModule { }
