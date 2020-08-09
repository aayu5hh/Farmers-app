import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
// import { UsersModule } from './users/users.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
      // { path: "", redirectTo: "login", pathMatch: "full" }
      // { path: "", component: HomeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
