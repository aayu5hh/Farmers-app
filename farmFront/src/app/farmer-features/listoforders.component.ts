import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listoforders',
  template: `
  <div class="card-title">
  <mat-divider></mat-divider><br>
  <div>

  </div>
    <p class='card-title'> <b> Your Order List </b> </p>
    <ol>
      <li *ngFor="let order of orders ">
        <mat-chip-list aria-label="Fish selection">
          <mat-chip  *ngIf="order.status  == 'Completed'"><p class="done"> Order status: {{ order.status }}</p></mat-chip>
          <mat-chip  *ngIf="order.status !== 'Completed'"><p class="error"> Order status: {{ order.status }}</p></mat-chip>
          <mat-chip> Order status: {{ order.status }} </mat-chip>
          <mat-chip> Customer email: {{order.customer._id }}</mat-chip>
          <mat-chip> Order Placed @ {{ order.pickup_date | date}}</mat-chip>
          <button  *ngIf="order.status   == 'Pending'"    mat-button color='primary' (click)="onOrderReady(order._id, order.userEmail)"> Click to Send Ready notification </button>
          <button  *ngIf="order.status  !== 'Completed'" mat-button color="warn" (click)="onOrderCompleted(order._id)">Click for Order Completed </button>
          </mat-chip-list>
          <mat-divider></mat-divider><br>
          <mat-divider></mat-divider><br>
      </li>  
    </ol>
  </div>

`,
  styles: [
  ]
})
export class ListofordersComponent implements OnInit {

  public user;
  public orders;
  constructor( private router: Router) {}





onOrderReady(id, email):void{
     // post 
}

onOrderCompleted(id){
   // post 
}

  ngOnInit(): void {
  
    // // dammy data 
     this.orders  = [{ total_price: 200, pickup_date : '08/12/2020', status: 'Pending', farmer : {_id :10}, customer :{_id : 12}}]
     
  }


  ngOnDestroy() {
    // unsubscrib 
  }
   

}
