import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-productlist',
  template: `
  <div *ngIf="!loading; else lodTemp" class="card-title">
  <p class='card-title'> <b> Your Product List </b> </p>
  <ol>
    <li *ngFor="let product of products " >
      <mat-chip-list aria-label="Fish selection">
      <img height="100" width="100" src="{{product.picture}}"  alt="Photo of Product"/>
        <mat-chip> Product: {{ product.name }}</mat-chip>
        <mat-chip> Price $ {{product.price }}</mat-chip>
        <mat-chip> Amount In Stock {{ product.quantity}}</mat-chip>
        <mat-chip> Amount In Stock {{ product.description}}</mat-chip>
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
  
  constructor(private router: Router){}


deleteProduct(farmer_id,product_id){
   //  we will pass data to backend throuth services 

}

  ngOnInit() {
       //  we will get data from backend throuth services
       this.loading = false 
       // dammy data 
       this.products  = [{ _id: 1001 , name : 'Tomato', price: 20, quantity:200, description : 'This is dammy ', picture :'' }]
  }


  ngOnDestroy() {
       // destroy sunscription 
  }
}
