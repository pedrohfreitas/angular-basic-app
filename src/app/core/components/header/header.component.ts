import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'basic-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    abrirSistemas: boolean;
    abrirInfos: boolean;
    lstSistemas: Array<any>;
    userInfo: any;

    constructor(private _authService: AuthService, private _spinnerService: NgxSpinnerService) {
    }

    ngOnInit() {

        this.lstSistemas = this._authService.getSistemas();
        this.userInfo = this._authService.getUserLogged();

        this._authService.sistemaNotifier.subscribe((sistemas) => {
            this.lstSistemas = sistemas;
        });

        this._authService.userInfoNotifier.subscribe((userInfo) => {
            this.userInfo = userInfo;
        })
    }

    onAtualizarMenus() {
        Swal.fire({
            title: "Atenção",
            html: `Sua página será atualizada e você poderá perder o trabalho realizado. Você deseja continuar ?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar ",
            reverseButtons: true
        }).then(result => {
            if (result.value) {
                this.atualizarMenus();
            }
        });
    }

    atualizarMenus() {
        this._spinnerService.show();
        this._authService.refreshCredentials().subscribe(() => {
            this._spinnerService.hide();
            window.location.reload();
        });
    }
}
