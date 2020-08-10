import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  template: `
  <div class="card text-center">
  <mat-divider></mat-divider><br />
  <mat-divider></mat-divider>
  <div>
    <form [formGroup]="myForm" (ngSubmit)="onsubmit()">
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
      </mat-form-field>

      <div class="form-group">
        <label class="card-title" for="file">
          Please select prduct Image
        </label>
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
          name: new FormControl('', [Validators.required, Validators.minLength(3)]),
         file: new FormControl('', [Validators.required]),
         price: new FormControl('', [Validators.required]),
         quantity: new FormControl('', [Validators.required]),
         description: new FormControl('', [Validators.required]),
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
    formData.append('name', this.myForm.get('name').value);
    formData.append('price', this.myForm.get('price').value);
    formData.append('quantity', this.myForm.get('quantity').value);
    formData.append('description', this.myForm.get('description').value);
          // we will post the data to backend 
  }
  ngOnDestroy() {
    if (this.obs$) {
      this.obs$.unsubscribe();
    }
  }
}
