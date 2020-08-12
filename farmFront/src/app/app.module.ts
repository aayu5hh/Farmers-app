import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import {SidebarModule} from "ng-sidebar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{ RequestInterceptor } from'./request.interceptor';
import { RouteGuard } from './route.guard';

@NgModule({
  declarations: [
    AppComponent, HomeComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,//MatCheckboxModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,
    RouterModule.forRoot([
      { path: "", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
      canActivate: [RouteGuard]},
      {path :'farmers', loadChildren: ()=>import('./farmer-features/farmer-features.module').then(m=>m.FarmerFeaturesModule)},

      // { path: "", redirectTo: "login", pathMatch: "full" }
      // { path: "", component: HomeComponent}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }  
