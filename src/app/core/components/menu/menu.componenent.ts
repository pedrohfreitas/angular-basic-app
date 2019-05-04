import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../security/services/auth.service';
import { Menu } from '../../security/models/menu.model';

@Component({
    selector: 'basic-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [
        trigger('toggleMenu', [
            state('hidden', style({ opacity: 0 })),
            state('visible', style({ opacity: 1 })),
            transition('* => *', animate('350ms 0s ease-in-out'))
        ]),
        trigger('toggleLogo', [
            state('hidden', style({ opacity: 0, 'margin-left': '-179px' })),
            state('visible', style({ opacity: 1, 'margin-left': 0 })),
            transition('hidden => visible', animate('350ms 0s ease-out')),
            transition('visible => hidden', animate('0ms 0s ease-in'))
        ])
    ]
})
export class MenuComponent implements OnInit {

    menuState: string[] = [];
    logoState: string = 'visible';

    toggleMenu: boolean[] = [];
    toggleSideBar: boolean = false;

    lstMenus: Menu[];
    ambiente: string = environment.ambiente;

    constructor(private _authService: AuthService) {  }

    ngOnInit() {
        this.lstMenus = new Array<Menu>();
        
        let menu2 : Menu = new Menu();
        menu2.nome = "Usuários";
        menu2.url = "usuario";
        menu2.nomeIcone = "fas fa-users";
        menu2.visivel = true;
        this.lstMenus.push(menu2);

        let menu3 : Menu = new Menu();
        menu3.nome = "Gráficos";
        menu3.url = "graficos";
        menu3.nomeIcone = "fas fa-chart-line";
        menu3.visivel = true;
        menu3.filhos = new Array<Menu>();

        let menu31 : Menu = new Menu();
        menu31.nome = "Gráfico de Barra";
        menu31.url = "graficos/graficobarra";
        menu31.visivel = true;
        menu3.filhos.push(menu31);

        let menu32 : Menu = new Menu();
        menu32.nome = "Gráfico de Pizza";
        menu32.url = "graficos/graficopizza";
        menu32.visivel = true;
        menu3.filhos.push(menu32);

        let menu33 : Menu = new Menu();
        menu33.nome = "Gráfico de Linha";
        menu33.url = "graficos/graficolinha";
        menu33.visivel = true;
        menu3.filhos.push(menu33);

        let menu34 : Menu = new Menu();
        menu34.nome = "Gráfico Diversos";
        menu34.url = "graficos/graficodiversos";
        menu34.visivel = true;
        menu3.filhos.push(menu34);

        this.lstMenus.push(menu3);

        this.configuraMenu(this.lstMenus);

        // this.configuraMenu(this._authService.getMenu());

        // this._authService.menuNotifier.subscribe((menus) => {
        //     this.configuraMenu(menus);
        // })
    }

    onToggleMenu(indice: number) {

        if (this.toggleSideBar) {
            this.onToggleSideBar();
        }

        this.menuState[indice] = this.menuState[indice] === 'hidden' ? 'visible' : 'hidden';

        if (this.toggleMenu[indice]) {
            const delay = timer(350);
            delay.subscribe(val => this.toggleMenu[indice] = !this.toggleMenu[indice]);
        } else {
            this.toggleMenu[indice] = !this.toggleMenu[indice];
        }

        for (let i = 0; i < this.toggleMenu.length; i++) {

            if (i != indice) {
                this.toggleMenu[i] = false;
                this.menuState[i] = 'hidden';
            }
        }
    }

    onToggleSideBar() {
        this.logoState = this.logoState === 'hidden' ? 'visible' : 'hidden';

        this.toggleSideBar = !this.toggleSideBar;
        for (let i = 0; i < this.toggleMenu.length; i++) {
            this.toggleMenu[i] = false;
            this.menuState[i] = 'hidden';
        }
    }

    private configuraMenu(menus): void {
        this.lstMenus = menus;

        if (this.lstMenus != null) {
            for (let i = 0; i < this.lstMenus.length; i++) {
                this.menuState[i] = 'hidden';
                this.toggleMenu[i] = false;
            }
        }
    }

}
