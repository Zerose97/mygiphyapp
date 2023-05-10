import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('auth_token');
    const apiKey = 'f8vr76W6mmiJcMTa7NMGXsCr0n1VN7AQ';
    const customReq = req.clone({
      params: req.params.set('api_key', apiKey)
    });
    // if (token) {
    //   const authReq = req.clone({
    //     headers: req.headers.set('Authorization', `Bearer ${token}`)
    //   });
    //   return next.handle(authReq);
    // } else {
    //   return next.handle(req);
    // }
    return next.handle(customReq);
  }
}
