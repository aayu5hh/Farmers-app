import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerFeaturesRoutingModule } from './farmer-features-routing.module';
import { ProductlistComponent } from './productlist.component';
import { AddproductComponent } from './addproduct.component';
import { ListofordersComponent } from './listoforders.component';
import { EditproductComponent } from './editproduct.component';
import {MaterialEditingModule}     from'../material/material.module'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductlistComponent, AddproductComponent, ListofordersComponent, EditproductComponent],
  imports: [
    CommonModule,
    FarmerFeaturesRoutingModule,
    ReactiveFormsModule,
    MaterialEditingModule
  ]
})
export class FarmerFeaturesModule { }
