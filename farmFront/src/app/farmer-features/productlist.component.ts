import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmersServicesService } from '../farmers-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-productlist',
  template: `
  <div *ngIf="!loading; else lodTemp" >
  <p> <b> Your Product List </b> </p>
  <ol>
    <li *ngFor="let product of products " >
      <mat-chip-list aria-label="Fish selection">
      <img height="100" width="100" src="{{product.picture}}"  alt="Photo of Product"/>
        <mat-chip> Product: {{ product.product_name }}</mat-chip>
        <mat-chip> Price $ {{product.price }}</mat-chip>
        <mat-chip> Amount In Stock {{ product.quantity}}</mat-chip>
        <mat-chip> Amount In Stock {{ product.product_description}}</mat-chip>
        <button mat-button color='primary'> <a [routerLink]="['product',product._id]" [state]="{product:product}">Edit Product</a> </button>
        <button mat-button color="warn" (click)=deleteProduct(user._id,product._id)><u>Delete Product</u></button>
        </mat-chip-list>
        <mat-divider></mat-divider><br>
        <mat-divider></mat-divider><br>
    </li>
  </ol>
</div>

<ng-template #lodTemp>
  <mat-spinner></mat-spinner>
</ng-template>


  `,
  styles: [
  ]
})
export class ProductlistComponent implements OnInit {

  public products;
  public loading: boolean = true;
  public obs$;
  public user;

  constructor(private router: Router, private farmerService: FarmersServicesService) { }


  deleteProduct(farmer_id,product_id) {
    //  we will pass data to backend throuth services 
    this.obs$ = this.farmerService.deleteFarmerProduct(farmer_id,product_id).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    //  we will get data from backend throuth services
    this.loading = false
    // dammy data 
    this.products  = [{ _id: 1001 , product_name : 'Tomato', price: 20, quantity:200, product_description : 'This is dammy ', picture :'' }]
    const helper = new JwtHelperService();
    const token = JSON.parse(localStorage.getItem('token'));
    const user = helper.decodeToken(token)
    console.log(user, token);
    this.obs$ = this.farmerService.getFarmerProducts(user._id).subscribe(data => {
      console.log(data);
    })
  }


  ngOnDestroy() {
    // destroy sunscription 
    if (this.obs$) {
      this.obs$.unsubscribe();
    }
  }
}
