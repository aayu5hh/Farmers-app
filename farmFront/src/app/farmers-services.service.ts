import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarmersServicesService {

  constructor(private http: HttpClient) { }

 

  /** get with token farmer prod */
  getFarmerProducts(farmer_id){
    //return this.http.get(``);
  }

  updateFarmerProduct(farmer_id, prod_id, body){
    
      // return this.http.post();
  }
  deleteFarmerProduct(farmer_id, product_id){
    //return this.http.delete(``);
  }

  getFarmerOrders(farmer_id){
    //return this.http.get(``);
  }



 

 
 

 
 

 
}
