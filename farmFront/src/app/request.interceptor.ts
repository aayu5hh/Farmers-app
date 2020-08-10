import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = localStorage.getItem('token');
 
    if (token) {
      console.log(token);
      request = request.clone({ headers: request.headers.set('Authorization', token) });
    }

    console.log(request);
    return next.handle(request);
  }
}
