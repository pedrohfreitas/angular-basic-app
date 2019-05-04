import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Token } from "src/app/models/token.model";
import { Usuario } from "src/app/models/usuario.model";
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) {
    }

    cepiApi(): Observable<any> {
        return this.http.get<any>(`${environment.ApiCEP}/api/getallestados`);
    }

    cepiApiCidade(cidade: string): Observable<any> {
        return this.http.get<any>(`${environment.ApiCEP}/api/getidandnamecidadebyestadoidandname?estadoId=PR&cidadeNome=${cidade}`);
    }

    buscar(quantidade: number): Usuario[] {

        let usuarios = new Array<Usuario>();
        for (let index = 0; index < quantidade; index++) {
            let situacao = '';

            if (index & 1) {
                situacao = 'Ativo';
            } else if (index / 2 == 1) {
                situacao = 'Inativo';
            } else {
                situacao = 'Pausado';
            }

            usuarios.push(new Usuario(index, `José ${index + 1}`, `Tenorio ${index + 1}`, new Date(), situacao))
        }

        return usuarios;
    }
}