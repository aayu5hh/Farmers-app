import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SidebarModule} from "ng-sidebar";

import { AppComponent } from './app.component';
// <<<<<<< HEAD
// import { LoginComponent } from './login.component';
// import { SignupComponent } from './signup.component';
// import { MainLayoutComponent } from './mainLayout/main-layout.component';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { ProductComponent } from './product/product.component';
// import { CartComponent } from './cart/cart.component';
// import { ProductsComponent } from './product/products.component';
// import {AddProductComponent} from './farmer/add-product.component';
// import { CheckoutComponent } from './customer/checkout/checkout.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { from } from 'rxjs';
// // import { SidebarComponent } from './sidebar/sidebar.component'
// // import {EditproductComponent} from './farmer/add-product.component'

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     SignupComponent,
//     MainLayoutComponent,
//     FooterComponent,
//     HeaderComponent,
//     ProductComponent,
//     CartComponent,
//     ProductsComponent,
//     CheckoutComponent,
//     NavbarComponent,
//     // SidebarComponent,
//     // EditproductComponent
// =======
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{ RequestInterceptor } from'./request.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, SidebarComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)}
      // { path: "", redirectTo: "login", pathMatch: "full" }
      // { path: "", component: HomeComponent}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }  
