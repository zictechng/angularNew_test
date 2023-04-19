
import { Injectable, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthServiceService) {}
  // intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //    const jwt = this.authService.getToken()
  //   return next.handle(httpRequest.clone(
  //     { setHeaders:
  //       { authorization: `Bearer ${jwt}` }
  // }));
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // you probably want to store it in localStorage or something
    if (!token) {
      return next.handle(req);
    }
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(req1);
  }

}


 // intercept(req:any, next:any) {
  //   let authServiceService = this.injector.get(AuthServiceService)
  //   let tokenizedReq = req.clone({
  //     setHeader:{
  //       Authorization: `Bearer ${authServiceService.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq)
  // }
