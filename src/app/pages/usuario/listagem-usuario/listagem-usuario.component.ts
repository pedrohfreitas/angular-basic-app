import { Component, OnInit } from '@angular/core';
import { TableSettings, TableColumn } from 'src/app/core/components/table/table.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ModalDataService } from 'src/app/core/components/modal/moda.service';
import { UsuarioService } from '../usuario.service';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-listagem-usuario',
  templateUrl: './listagem-usuario.component.html'
})
export class ListagemUsuarioComponent implements OnInit {

  tableSettings: TableSettings;
  usuarios: Usuario[];
  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private modalDataService: ModalDataService, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.breadcrumbModel.push(new BreadcrumbModel([''],'Buscar Usuários',true));

    this.tableSettings = new TableSettings(true)

    //Titulo da Tabela
    this.tableSettings.title = "Busca de Usuários";

    // Url que o botão de cadastro deve chamar
    this.tableSettings.routerRegister.push("..");
    this.tableSettings.routerRegister.push("cadastro");

    //Configuração das Colunas
    this.tableSettings.columns.push(new TableColumn("id", "Id", true, 10))
    this.tableSettings.columns.push(new TableColumn("nome", "Nome", false, 15))
    this.tableSettings.columns.push(new TableColumn("sobrenome", "Sobrenome", true, 30))
    this.tableSettings.columns.push(new TableColumn("dataNascimento", "Data de Nascimento", false, 15, false, DatePipe, "shortDate"))
    this.tableSettings.columns.push(new TableColumn("situacao", "Situação", false, 10, true))
    this.tableSettings.columns.push(new TableColumn("acoes", "Ações", false, 15, true))

    this.tableSettings.source = this.usuarioService.buscar(354);
    this.tableSettings.totalItems = this.usuarioService.buscar(354).length;

    this.tableSettings.changedTableServerSide.subscribe(paginacao => console.log("Paginação Server Side", paginacao));
  }

  onBuscar() {
    this.tableSettings.totalItems = this.usuarioService.buscar(214).length;
    this.tableSettings.source = this.usuarioService.buscar(214);
    this.tableSettings.onReloadSettings(this.tableSettings);
  }

  onLimpar() {

  }

  onVisualizar(item) {
    this.modalDataService.storage = item;
    this.router.navigate([{ outlets: { modal: ['visualizar'] } }], { relativeTo: this.route, skipLocationChange: true });
  }

  onExcluirItem(item) {
    Swal.fire({
      title: "Atenção",
      html: `você deseja excluir o item ${item.id}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar ",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.excluirItem(item);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Operação cancelada',
          'error'
        )
      }
    });
  }

  excluirItem(item) {
    Swal.fire(
      'Sucesso!',
      'O item foi removido com sucesso!',
      'success'
    )
  }
}
