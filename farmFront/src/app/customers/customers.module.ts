import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RequestInterceptor } from '../request.interceptor';
import {CheckoutComponent} from './checkout/checkout.component'
import {CustomerOrdersComponent} from './orders/customer-orders.component'
import { from } from 'rxjs';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FirstMessageComponent } from './first-message/first-message.component';

@NgModule({
  declarations: [
    HomeComponent,CheckoutComponent,
    ProductsComponent, NavbarComponent,
    FooterComponent, FirstMessageComponent,
    CustomerOrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'checkout',component:CheckoutComponent},
      {path:'orders',component:CustomerOrdersComponent},
      {path: '', component: HomeComponent, children: [
        {path: '', redirectTo: 'home'},
        {path: 'home', component: FirstMessageComponent},
        {path: ':farmer_id', component: ProductsComponent}
      ]},  

      // {path: 'login', loadChildren: () => import("../users/users.module").then(m => m.UsersModule)},
    ])
  ]
})
export class CustomersModule { }
