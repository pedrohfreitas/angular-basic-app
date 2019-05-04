import { CanActivateChild, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class MenuGuard implements CanActivate, CanActivateChild {

    constructor(private _router: Router, private _auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.verify(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.verify(childRoute, state);
    }

    verify(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // let menu = this._auth.getMenu();
        // if (menu == null) {
        //     return this._auth.refreshCredentials().pipe(
        //         map((response) => {return true;}),
        //         catchError(err => of(false)));
        // } else {
        //     if (!this._auth.verifyMenuAcesso(this.getUrl(route, state))) {
        //         this._router.navigate(["/acesso-negado"]);
        //         return false;
        //     }
        //     return true;
        // }
        return true;
    }

    getUrl(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
        
        let url : Array<String> = new Array<String>();
        
        route.pathFromRoot.forEach(element => {
            if(element.routeConfig && element.routeConfig.path != ''){
                url.push(element.routeConfig.path);
            }
        });

        let urlFormatada : string = url.join("/");

        //Remove os parametros da URL
        if(urlFormatada.indexOf(":") != -1){
            let arrayUrl = urlFormatada.split("/").filter(r => r[0] != ":").join("/");

            return arrayUrl
        }else{
            return urlFormatada;
        }
    }

    logout(state: any) {
        // this._auth.logout();
        this._router.navigate(["/logout"], { queryParams: { error: true } });
    }
}
