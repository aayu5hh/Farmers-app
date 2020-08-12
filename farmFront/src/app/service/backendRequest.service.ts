import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {
  
  baseUrl: String = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  signUp(account) {
    return this.http.post(this.baseUrl + 'signup', account);
  }

  login(account) {
    return this.http.post(this.baseUrl + 'login', account);
  }

  getUserDetails(){
    return this.http.get(this.baseUrl + 'userdata');
  }

  getAllFarmersData(): Observable<any> {
    return this.http.get(this.baseUrl + 'farmer');
  }

  getFarmerProductsById(id) {
    return this.http.get(this.baseUrl + `customer/${id}`);
  }
}
