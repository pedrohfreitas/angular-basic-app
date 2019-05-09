import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, 
    private _authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.verify(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.verify(state);
  }

  verify(state: RouterStateSnapshot): Observable<boolean> | boolean {
    //Verifica se o usuário tem registros de logado
    // if (!this._authService.isLoggedIn() || this._authService.getMenu() == null) {
      //   return this._authService.login();
        this._router.navigate(['/login']);
    // }else{
      return true;
    // }
  }
}
