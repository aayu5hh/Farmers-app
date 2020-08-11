import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators}  from '@angular/forms'
import { Router } from '@angular/router';
import{FarmersServicesService} from'../farmers-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-editproduct',
  template: `
  <p  class="card-title text-center">
  Please Fill out to edit 
</p>
  <div class="card text-center">
  <mat-divider></mat-divider><br /><br />
  
  <mat-divider></mat-divider>
  <div>
    <form [formGroup]="myForm"   (ngSubmit)="onsubmit()" >
    <mat-form-field class="form-full-width">
    <mat-label> Prduct Name </mat-label>
    <input
      matInput
      placeholder="Product name "
      formControlName="product_name"
    />
  </mat-form-field>
  <mat-form-field class="form-full-width">
    <mat-label>Price $ </mat-label>
    <input
      matInput
      placeholder="price "
      formControlName="price"    
    />
  </mat-form-field>
  <mat-form-field class="form-full-width">
  <mat-label> Description</mat-label>
  <input
    matInput
    placeholder="description "
    formControlName="product_description"    
  />
</mat-form-field>
  <mat-form-field class="form-full-width">
    <mat-label> Qty In Stock </mat-label>
    <input
      matInput
      placeholder="Qty In Stock "
      formControlName="quantity"
    />
  </mat-form-field><br>
      
      <img height="100" width="100" src="{{product.picture}}"  alt="Photo of Product"/><br>
      <button mat-raised-button color='primary' type="submit" [disabled]="!myForm.valid"> Submit Change </button>
    </form>
  </div>
</div>
  `,
  styles: [
  ]
})
export class EditproductComponent implements OnDestroy {
public product;
public subscrib$;
public myForm: FormGroup;

    constructor(private formBuilder: FormBuilder , private router: Router, private farmersservice : FarmersServicesService ){
          this.product = router.getCurrentNavigation().extras.state?.product
                       console.log(this.product);

                this.myForm = this.formBuilder.group({
                         name: [this.product.product_name, Validators.required],
                         quantity: [this.product.quantity, Validators.required],
                         price: [this.product.price, Validators.required],
                         description: [this.product.product_description, Validators.required]
                         });  
}



  onsubmit(){
    
    //  we will post the new edited data to back end ( this.form.vlaue )
     // navigate back to product list 
     const helper = new JwtHelperService();
     const token = JSON.parse(localStorage.getItem('token'));
     const user = helper.decodeToken(token)
     console.log(user, token, this.myForm.value);
     this.subscrib$ =  this.farmersservice.updateFarmerProduct(user._id, this.product._id, this.myForm.value).subscribe( data=>{
                 console.log(data);
  })

}

  ngOnDestroy() {
    //destroy /unsubscribe
    this.subscrib$.unsubscribe();
    // 
  }

}
