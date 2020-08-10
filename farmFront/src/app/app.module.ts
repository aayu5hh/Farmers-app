import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{ RequestInterceptor } from'./request.interceptor';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)}
      // { path: "", redirectTo: "login", pathMatch: "full" }
      // { path: "", component: HomeComponent}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
