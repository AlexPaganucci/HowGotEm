import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

   let AuthToken = this.authSrv.getAuthToken();
   let User = this.authSrv.loggedUser();


  if (AuthToken && User) {
    request = request.clone({
        setHeaders :
        {
          Authorization: AuthToken
        }
      })
  }
    return next.handle(request);
  }
}
