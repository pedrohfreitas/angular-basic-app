import { NgModule } from "@angular/core";
import { UsuarioComponent } from "./usuario.component";
import { SharedModule } from "../shared.module";
import { Routes, RouterModule } from "@angular/router";
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { VisualizarUsuarioComponent } from './visualizar-usuario/visualizar-usuario.component';
import { ModalDataService } from "src/app/core/components/modal/moda.service";
import { BasicComponentsModule } from "src/app/core/components/basic.components.module";
import { UsuarioService } from "./usuario.service";
import { ListagemUsuarioComponent } from "./listagem-usuario/listagem-usuario.component";
import { AuthDirective } from 'src/app/core/directives/permissao.directive';
import { MenuGuard } from 'src/app/core/security/guards/menu.guard';

const ROUTES: Routes = [
    {
        path: '', component: UsuarioComponent, canActivate: [MenuGuard], canActivateChild: [MenuGuard], children: [
            { path: '', redirectTo: 'listagem', pathMatch: 'prefix' },
            {
                path: 'listagem', component: ListagemUsuarioComponent, data: { state: 'primaria', cache: true }, children: [
                    { path: 'visualizar', component: VisualizarUsuarioComponent, outlet: "modal" }
                ]
            },
            { path: 'cadastro', component: CadastroUsuarioComponent, data: { state: 'secundaria' }, children: [] },
            { path: 'editar/:id', component: EditarUsuarioComponent, data: { state: 'secundaria' } },
        ]
    },
]
@NgModule({
    declarations: [
        UsuarioComponent,
        CadastroUsuarioComponent,
        EditarUsuarioComponent,
        VisualizarUsuarioComponent,
        ListagemUsuarioComponent,
        AuthDirective
    ],
    imports: [
        SharedModule.forRoot(),
        RouterModule.forChild(ROUTES),
        BasicComponentsModule
    ],
    providers: [
        ModalDataService,
        UsuarioService
    ]
})
export class UsuarioModule {

}