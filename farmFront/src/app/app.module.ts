import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import {SidebarModule} from "ng-sidebar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{ RequestInterceptor } from'./request.interceptor';
import { CustomerRouteGuard } from './guard/customerRoute.guard';
import { FarmerRouteGuard } from './guard/FarmerRoute.guard';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,MatCheckboxModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,
    RouterModule.forRoot([
      { path: "", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
      canActivate: [CustomerRouteGuard]},
      {path :'farmers', loadChildren: ()=>import('./farmer-features/farmer-features.module').then(m=>m.FarmerFeaturesModule),
      canActivate: [FarmerRouteGuard]},

      // { path: "", redirectTo: "login", pathMatch: "full" }
      // { path: "", component: HomeComponent}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }  
