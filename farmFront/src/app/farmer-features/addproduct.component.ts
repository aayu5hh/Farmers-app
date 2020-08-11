import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-addproduct',
  template: `
  <div class="card text-center">
  <mat-divider></mat-divider><br />
  <p class="card-title">
    Add Product
  </p>
  <mat-divider></mat-divider>
  <div>
  <div>
    <form [formGroup]="myForm" (ngSubmit)="onsubmit()">
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
      </mat-form-field>

      <div class="form-group">
      
        <input
          formControlName="file"
          id="file"
          type="file"
          class="form-control"
          (change)="onFileChange($event)"
        />
      </div>
      <button mat-raised-button color='primary'  type="submit" [disabled]="!myForm.valid">Add Product </button>
    </form>
  </div>
</div>
  `,
  styles: [
  ]
})
export class AddproductComponent implements OnDestroy {

  public obs$;
  myForm = new FormGroup({
    product_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
         file: new FormControl('', [Validators.required]),
         price: new FormControl('', [Validators.required]),
         quantity: new FormControl('', [Validators.required]),
         product_description: new FormControl('', [Validators.required]),
         fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  onsubmit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    formData.append('name', this.myForm.get('product_name').value);
    formData.append('price', this.myForm.get('price').value);
    formData.append('quantity', this.myForm.get('quantity').value);
    formData.append('description', this.myForm.get('product_description').value);
          // we will post the data to backend 
         // const user = this.localService.getUser();
          const helper = new JwtHelperService();

          const token = JSON.parse(localStorage.getItem('token'));
          const user = helper.decodeToken(token)
                console.log(user, token, formData);
          // const expirationDate = helper.getTokenExpirationDate(myRawToken);
          // const isExpired = helper.isTokenExpired(myRawToken);
          //decodeToken using angular2-auth and get the entire user json
          this.obs$ = this.http
            .post(`http://localhost:3000/farmer/${user._id}/add`, formData)
            .subscribe((res) => {
              console.log(res);
              alert('Product Uploaded Successfully !!');
              this.router.navigateByUrl('/farmers/productlist');
            });
    
  }
  ngOnDestroy() {
    if (this.obs$) {
      this.obs$.unsubscribe();
    }
  }
}
