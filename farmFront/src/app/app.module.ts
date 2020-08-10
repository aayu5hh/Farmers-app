import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SidebarModule} from "ng-sidebar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { MainLayoutComponent } from './mainLayout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './product/products.component';
import {AddProductComponent} from './farmer/add-product.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { from } from 'rxjs';
// import { SidebarComponent } from './sidebar/sidebar.component'
// import {EditproductComponent} from './farmer/add-product.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainLayoutComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    ProductsComponent,
    CheckoutComponent,
    NavbarComponent,
    // SidebarComponent,
    // EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
