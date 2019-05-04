import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Observable } from "rxjs";
import { Auth } from "../models/auth.model";
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/models/token.model';
import { Menu } from '../models/menu.model';
import { Privilegio } from '../models/privilegio.model';

@Injectable()
export class AuthService {

  private apiUrl: string;
  private permissaoSistemaCodigoReferencia: string;
  private keyTokenName: any;
  private keyUser: any;
  private keyMenuName: any;
  private keySistemaName: any;
  public menuNotifier = new EventEmitter<any>();
  public sistemaNotifier = new EventEmitter<any>();
  public userInfoNotifier = new EventEmitter<any>();

  constructor(private http: HttpClient) {
    this.keyTokenName = "basic-appToken_" + environment.ambiente;
    this.keyUser = "basic-appUser_" + environment.ambiente;
    this.keyMenuName = "basic-appMenu_" + environment.ambiente;
    this.keySistemaName = "basic-appSistema_" + environment.ambiente;
    this.apiUrl = environment.apiAccobasic;
    this.permissaoSistemaCodigoReferencia = environment.permissaoSistemaCodigoReferencia;
  }

  //Eventos de Notificação - Para carregamento dos Menus
  menuNotify(menus: any) {
    this.menuNotifier.emit(menus);
  }

  //Eventos de Notificação - Para carregamento dos Sistemas
  sistemaNotify(sistema: any) {
    this.sistemaNotifier.emit(sistema);
  }

  //Eventos de Notificação - Para carregamento das Informações do Usuário
  userInfoNotify(userInfo: any) {
    this.userInfoNotifier.emit(userInfo);
  }

  setToken(value: any) {
    localStorage.setItem(this.keyTokenName, value);
  }

  setUserLogged(value: Auth) {
    localStorage.setItem(this.keyUser, JSON.stringify(value));
    this.userInfoNotify(value);
  }

  setMenu(value: any) {
    localStorage.setItem(this.keyMenuName, JSON.stringify(value));
    this.menuNotify(value);
  }

  setSistemas(value: any) {
    localStorage.setItem(this.keySistemaName, JSON.stringify(value));
    this.sistemaNotify(value);
  }

  getToken(): any {
    return localStorage.getItem(this.keyTokenName);
  }

  getMenu(): Menu[] {
    let menuString: string = localStorage.getItem(this.keyMenuName);
    if (menuString == null || menuString == undefined) {
      return null;
    }

    let menu: Menu[] = JSON.parse(menuString);

    return menu;
  }

  getUserLogged() {
    let user = localStorage.getItem(this.keyUser);
    if (user == null || user == undefined) return null;
    return JSON.parse(user);
  }

  getSistemas() {
    let sistemas: any = localStorage.getItem(this.keySistemaName);
    if (sistemas == null || sistemas == undefined) return sistemas;
    return JSON.parse(sistemas);
  }

  //Método que verifica se o usuário tem acesso a URL ou não
  verifyMenuAcesso(url: string) {
    let menus: Menu[] = this.getMenu();
    if (menus == null) {
      return false;
    }

    let acesso = menus.map((x: Menu) => {
      if (x.filhos.length > 0){
        return x.filhos.map((x: Menu) => x.url);
      }
      return new Array<string>(x.url);
    });

    let permitido = acesso.find((x: any) => x.find((y: any) => y == url));
    
    return permitido == undefined || permitido == null ? false : true;
  }

  ///Método que verifica se o usuário tem um privilegio para acessar algo
  verifyPrivilegio(menuCodigo: string, privilegioCodigo: string): boolean {
    if (!menuCodigo || !privilegioCodigo) {
      return false;
    }

    let menus: Menu[] = this.getMenu();
    if (menus == null) {
      return false;
    }

    let menu = null;

    menus.forEach(element => {
      let result = this.menuRecursive(element, menuCodigo);
      if (result != null) {
        menu = result;
      }
    });

    if (menu == null || menu.Privilegios == null) {
      return false;
    }

    let privilegios: Privilegio[] = menu.Privilegios.filter((p: Privilegio) => (
      p.CodigoReferencia == privilegioCodigo
    ));

    if (privilegios != null && privilegios.length > 0) {
      //encontrou o privilégio
      return true;
    } else {
      //não encontrou o privilégio
      return false;
    }
  }

  login(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}v1/authenticate/sistema/${this.permissaoSistemaCodigoReferencia}`, { withCredentials: true }).pipe(
      map(response => {
        if (response && response.token) {
          this.saveCredentials(response);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  refreshCredentials() {
    return this.http.get<any>
      (`${this.apiUrl}v1/authenticate/refreshcredentials/${this.permissaoSistemaCodigoReferencia}`, { withCredentials: true }).pipe(
        map(response => {
          if (response && response.token) {
            this.saveCredentials(response);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  tokenCepRSA(): Observable<any> {
    let obj = {
      "guidKey": environment.TokenRSACEP
    }
    return this.http.post<Token>(environment.TokenRSAApi, obj);
  }


  isLoggedIn(): boolean {
    let currentToken = this.getToken();
    if (currentToken == null || currentToken == undefined)
      return false;

    let user = this.getUserLogged();
    if (user != null || user == undefined)
      return false;
    if (user.matricula == null)
      return false;

    return true;
  }

  private saveCredentials(authorization: any) {
    let auth = new Auth();
    auth.matricula = authorization.user.username;
    auth.email = authorization.user.email;
    auth.nome = authorization.user.claims.NomePessoa;
    this.setToken(authorization.token);
    this.setUserLogged(auth);
    this.setMenu(authorization.user.menus);
    this.setSistemas(authorization.user.sistemas);
  }

  private menuRecursive(menu: Menu, codigoReferencia: string) {
    if (menu.codigoReferencia == codigoReferencia) {
      return menu;
    } else {
      for (var index in menu.filhos) {
        var node = menu.filhos[index];
        if (node.codigoReferencia == codigoReferencia)
          return node;

        this.menuRecursive(node, codigoReferencia);
      }
    }
  }
}
