import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CepInterceptor implements HttpInterceptor {
  private urlException = [
    environment.ApiCEP
  ];

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.urlException.filter(r => request.url.includes(r)).length > 0){
      return this.auth.tokenCepRSA().pipe(
        switchMap((result) => {
          const requestReq = request.clone({
            headers: request.headers.set("Authorization", `RSA Signature: ${result.data.token}`)
          });
          return next.handle(requestReq);
        })
      )
    }else{
      return next.handle(request);
    }
  }
}