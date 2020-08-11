import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RequestInterceptor } from '../request.interceptor';
import {CheckoutComponent} from './checkout/checkout.component'
import {CustomerOrdersComponent} from './orders/customer-orders.component'
import { from } from 'rxjs';

@NgModule({
  declarations: [HomeComponent,CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent, canActivate: []},
      {path:'checkout',component:CheckoutComponent,canActivate:[]},
      {path:'orders',component:CustomerOrdersComponent,canActivate:[]}

      // {path: 'login', loadChildren: () => import("../users/users.module").then(m => m.UsersModule)},
    ])
  ]
})
export class CustomersModule { }
