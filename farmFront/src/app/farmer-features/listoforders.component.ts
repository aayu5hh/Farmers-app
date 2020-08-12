import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import{FarmersServicesService} from'../farmers-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";



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
          <mat-chip> Order status: {{ orders.status }} </mat-chip>
          <mat-chip> Customer email: {{orders.customer.id }}</mat-chip>
          <mat-chip> Order Placed @ {{ orders.pickup_date | date}}</mat-chip>
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
  public obs$;
  constructor( private router: Router, private farmerService:FarmersServicesService) {}





//   onOrderReady(id, email):void{
//     console.log(id,email)
// this.farmerService.setEmailReciver(email);
// this.obs$ = this.farmerService.changeOrderStatus(id , {status : 'Ready'}).subscribe( changed =>{
//      console.log(changed);
//      this.ngOnInit();
// })
// this.router.navigateByUrl('/farmer/sendemail');
// }

// onOrderCompleted(id){
// this.obs$ = this.farmerService.changeOrderStatus(id, {status : 'Completed'}).subscribe( changed =>{
//  this.router.navigateByUrl('/farmer/orders')
//  this.ngOnInit();
// })
//}

  ngOnInit(): void {
  
    // // dammy data 
    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('token'))
    console.log(user.id)
    this.obs$=this.farmerService.getFarmerOrders(user.id).subscribe(data=>{
      this.orders=data;
      console.log("inside orders")
      console.log(data)
    })
     //this.orders  = [{ total_price: 200, pickup_date : '08/12/2020', status: 'Pending', farmer : {_id :10}, customer :{_id : 12}}]
     
  }


  ngOnDestroy() {
    // unsubscrib 
  }
   

}
