import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators}  from '@angular/forms'
import { Router } from '@angular/router';
import{FarmersServicesService} from'../farmers-services.service'
@Component({
  selector: 'app-editproduct',
  template: `

  <div class="card text-center">
  <mat-divider></mat-divider><br /><br />
  <p class="card-title">
    Please Fill out to edit 
  </p>
  <mat-divider></mat-divider>
  <div>
    <form [formGroup]="myForm"   (ngSubmit)="onsubmit()" >
    <mat-form-field class="form-full-width">
    <mat-label> Prduct Name </mat-label>
    <input
      matInput
      placeholder="Product name "
      formControlName="name"
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
    formControlName="description"    
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
                         name: [this.product.name, Validators.required],
                         quantity: [this.product.quantity, Validators.required],
                         price: [this.product.price, Validators.required],
                         description: [this.product.description, Validators.required]
                         });  
}



  onsubmit(){
    
    //  we will post the new edited data to back end ( this.form.vlaue )
    // console.log(this.myForm.value)
     // navigate back to product list 
    //this.subscrib$ =  this.farmersservice.editFarmersProduct("farmer_id", "product_id",this.myForm.value).subscribe( data=>{}
  }

  ngOnDestroy() {
    //destroy /unsubscribe
    this.subscrib$.unsubscribe();
    // 
  }

}
