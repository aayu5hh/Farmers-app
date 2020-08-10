import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {
  private responseMsg;
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
}
