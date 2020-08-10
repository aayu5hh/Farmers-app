import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RequestInterceptor } from '../request.interceptor';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent, canActivate: []},
      // {path: 'login', loadChildren: () => import("../users/users.module").then(m => m.UsersModule)},
    ])
  ]
})
export class CustomersModule { }
