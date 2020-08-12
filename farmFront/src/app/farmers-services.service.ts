import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarmersServicesService {

  constructor(private http: HttpClient) { }

 

  /** get with token farmer prod */
  getFarmerProducts(farmer_id){
    return this.http.get(`http://localhost:3000/farmer/${farmer_id}`);
  }

  updateFarmerProduct(farmer_id, prod_id, body){
    return this.http.patch(`http://localhost:3000/farmer/${farmer_id}/${prod_id}`, body);
  }
  deleteFarmerProduct(farmer_id,product_id){
    return this.http.delete(`http://localhost:3000/farmer/${farmer_id}/${product_id}`);
  }

  getFarmerOrders(farmer_id){
    return this.http.get(`http://localhost:3000/farmer/orders/${farmer_id}`);
  }



 

 
 

 
 

 
}
