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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    

    return next.handle(request);
  }
}
