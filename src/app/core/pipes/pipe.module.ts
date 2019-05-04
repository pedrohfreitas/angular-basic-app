import { NgModule } from '@angular/core';

import { CapitalizePipe } from './capitalize.pipe';
import { Cep } from './cep.pipe';
import { SafePipe } from './safe.pipe';
import { CnpjPipe } from './cnpj.pipe';
import { CpfPipe } from './cpf.pipe';
import { TelefonePipe } from './telefone.pipe';
import { InnerHTML } from './html.pipe';
import { MenuVisibelPipe } from './menu-visivel.pipe';



@NgModule({
  declarations: [
    Cep,
    SafePipe,
    CapitalizePipe,
    CnpjPipe,
    CpfPipe,
    TelefonePipe,
    InnerHTML,
    MenuVisibelPipe,
  ],
  imports: [],
  exports: [
    Cep,
    SafePipe,
    CapitalizePipe,
    CnpjPipe,
    CpfPipe,
    TelefonePipe,
    InnerHTML,
    MenuVisibelPipe
  ],
  providers: [
    Cep,
    SafePipe,
    CapitalizePipe,
    CnpjPipe,
    CpfPipe,
    TelefonePipe,
    InnerHTML,
    MenuVisibelPipe
  ]
})

export class PipesModule {

}
