import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-editar-usuario',
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {

  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  constructor() { }

  ngOnInit() {

    this.breadcrumbModel.push(new BreadcrumbModel(['..','listagem'],'Buscar Usuários',false));
    this.breadcrumbModel.push(new BreadcrumbModel([''],'Editar',true));
    
  }

}
