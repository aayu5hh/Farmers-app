import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist.component';
import { AddproductComponent } from './addproduct.component';
import { ListofordersComponent } from './listoforders.component';
import { EditproductComponent } from './editproduct.component';

const routes: Routes = [
  {path:'productlist', component:ProductlistComponent},
  {path:'addproduct', component:AddproductComponent},
  {path:'listoforders', component:ListofordersComponent},
  {path:'productlist/product/:id', component:EditproductComponent },
  {path : 'orders', component : ListofordersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerFeaturesRoutingModule { }
