import { Component, OnInit } from '@angular/core';
import { ModalDataService } from 'src/app/core/components/modal/moda.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'basic-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html'
})
export class VisualizarUsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(private modalDataService: ModalDataService) { }

  ngOnInit() {
    this.usuario = this.modalDataService.storage;
  }

}
