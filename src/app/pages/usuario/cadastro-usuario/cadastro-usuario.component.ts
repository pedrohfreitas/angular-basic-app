import { of, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AutocompleteModel, AutocompleteSettings } from 'src/app/core/components/autocomplete/autocomplete.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Token } from 'src/app/models/token.model';
import { map } from 'rxjs/operators';
import { CustomValidator } from 'src/app/core/validators/custom.validator';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {

  autocompleteEstadoModel: AutocompleteModel[] = new Array<AutocompleteModel>();
  autocompleteEstadoSettings: AutocompleteSettings;
  autocompleteCidadeSettings: AutocompleteSettings;
  estadosKey: string[] = new Array<string>();
  autoCompleteCidadeItemSelected: any;
  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.breadcrumbModel.push(new BreadcrumbModel(['..', 'listagem'], 'Buscar Usuários', false));
    this.breadcrumbModel.push(new BreadcrumbModel([''], 'Cadastrar', true));

    this.usuarioForm = new FormGroup({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      sobrenome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      senha: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required, (control) => CustomValidator.ValidaEstado(control, this.estadosKey)]),
      cidade: this.formBuilder.control('', [Validators.required]),
      rua: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      administrador: this.formBuilder.control('')
    }, { updateOn: 'blur' });

    //Carrega a combo de cidade
    this.autocompleteCidadeSettings = new AutocompleteSettings("Cidades do PR", true, true);
    this.autocompleteCidadeSettings.onSearchResults = (text: any) => Observable.create((observer) => {
      this.usuarioService.cepiApiCidade(text).subscribe(
        (results: any) => {
          let cidades = results.map((x: any) => {
            return { key: x.id, value: `${x.id} - ${x.nome}`, item: x }
          });
          observer.next(cidades);
          observer.complete(cidades);
        });
    });

    //Carrega a combo de estado
    this.autocompleteEstadoSettings = new AutocompleteSettings("Estado", true);
    this.usuarioService.cepiApi().subscribe(e => {
      e.map((estado) => {
        this.autocompleteEstadoModel.push(new AutocompleteModel(estado.id, estado.nome));
        this.estadosKey.push(estado.id)
      });

      this.autocompleteEstadoSettings.onChangeSourceAutocomplete(this.autocompleteEstadoModel);
    });

  }

  onSalvar() {
    console.log(this.usuarioForm.value);
  }
}
