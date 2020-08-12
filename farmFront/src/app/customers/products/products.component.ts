import { Component, OnInit } from '@angular/core';
import { BackendRequestService } from 'src/app/service/backendRequest.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  host: {class: 'row'}
})
export class ProductsComponent implements OnInit {

  farmer_id;
  farmerProducts;

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(
      (param: any) => {this.farmer_id = param['farmer_id']; console.log(this.farmer_id)}
    )
  }

  ngOnInit(): void {
    this.backendService.getFarmerProductsById(this.farmer_id).subscribe(
      (data) => {
        this.farmerProducts = data[0];
        console.log(this.farmerProducts);
      },
      (err) => console.log(err)
    )
  }

}
