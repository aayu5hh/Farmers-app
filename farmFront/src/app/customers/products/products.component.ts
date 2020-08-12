import { Component, OnInit } from '@angular/core';
import { BackendRequestService } from 'src/app/service/backendRequest.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  host: { class: 'row' }
})
export class ProductsComponent implements OnInit {

  farmer_id;
  farmerProducts;
  private subscription: Subscription;

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.farmer_id = param['farmer_id'];
        console.log(this.farmer_id);
        this.ngOnInit();
      }
    )
  }

  ngOnInit(): void {
    this.backendService.getFarmerProductsById(this.farmer_id).subscribe(
      (data) => {
        this.farmerProducts = data[0].product;
        console.log(this.farmerProducts);
      },
      (err) => console.log(err)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
