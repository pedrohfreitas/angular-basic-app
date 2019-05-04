import { LoadingComponent } from './../core/components/loading/loading.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { AuthInterceptor } from "../core/security/interceptors/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "../core/security/services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../core/security/guards/auth.guard";
import { RouterModule } from "@angular/router";
import { CepInterceptor } from '../core/security/interceptors/cep.interceptor';
import { LoadingService } from '../core/components/loading/loading.service';
import { MenuGuard } from '../core/security/guards/menu.guard';

@NgModule({
    declarations: [LoadingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingComponent]
})
export class SharedModule {

    //Função que retorna os Modulos e Serviços
    //Isso possibilidade que o sharemodule possa retornar apenas os modulos, quando chamado normalmente
    // ou retorna a lista de provides quando chamando utilizando o forRoot
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard,
                MenuGuard,
                LoadingService,
                {provide: HTTP_INTERCEPTORS, useClass: CepInterceptor, multi: true},
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}//multi siginifa que ele irá entrar na lista de todos os intercepetors
            ] 
        }
    }

} 