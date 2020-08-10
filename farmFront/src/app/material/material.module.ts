

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar'; //
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule}   from '@angular/material/list';
import {MatSidenavModule}  from '@angular/material/sidenav';
import {MatCardModule}  from'@angular/material/card';
import {MatProgressBarModule} from'@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule}  from '@angular/material/paginator';


const Matherial = [
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatCardModule,
  MatProgressBarModule,
  MatChipsModule,
  MatSortModule,
  MatPaginatorModule,

];

@NgModule({
  imports: [Matherial],
  exports :[Matherial]
})
export class MaterialEditingModule { }
