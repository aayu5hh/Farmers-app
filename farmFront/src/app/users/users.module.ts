import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ])
  ]
})
export class UsersModule { }
