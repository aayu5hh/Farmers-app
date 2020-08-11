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

  farmerProducts;

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.backendService.getAllFarmersData().subscribe(
      (data) => {
        console.log('getting all farmers data..');
        console.log(data);
        // this.allFarmers = data;
      },
      (err) => console.log(err)
    )
  }

}
