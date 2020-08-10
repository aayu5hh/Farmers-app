import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {path:'login' , component: LoginFormComponent},
  // {path:'signup' , component: SignupFormComponent},
  {path: 'farmers', loadChildren : ()=>import('./farmer-features/farmer-features.module').then( m =>m.FarmerFeaturesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
