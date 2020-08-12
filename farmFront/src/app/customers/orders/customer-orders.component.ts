import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendRequestService } from '../../service/backendRequest.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  items = [{"name":"Potato","quantity":2,"price":5},
  {"name":"Tomato","quantity":3,"price":10},
  {"name":"carrot","quantity":5,"price":15}];

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

}
