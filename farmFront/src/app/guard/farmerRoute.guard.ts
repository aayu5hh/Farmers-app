import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerRouteGuard implements CanActivate {

  constructor(private r: Router, private _authService: AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const token = localStorage.getItem('token');
      if((token !== null) && (this._authService.getDecodedAccessToken(token).role == 'farmer') ) {
        
        return true;

      } else {

        this.r.navigate(['login']);
      }
      return false;
  }
  
}
