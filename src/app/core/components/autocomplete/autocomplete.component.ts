import { Component, OnInit, HostListener, ViewChild, Input, AfterContentInit, ContentChild, forwardRef, Optional, Host, SkipSelf, Output, EventEmitter } from '@angular/core';
import { Helper } from '../../helpers/helper';
import { AutocompleteModel, AutocompleteSettings } from './autocomplete.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControlName, ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
  selector: 'basic-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, AfterContentInit, ControlValueAccessor {

  @Input() settings: AutocompleteSettings;
  @Input() formControlName: string;
  @Output() selectedItemEmitter = new EventEmitter();
  @ViewChild('autocomplete') myDiv;

  public autocompleteModelFiltrado: AutocompleteModel[] = new Array<AutocompleteModel>();
  public VisualizarAutocomplete = false;
  public valueIndex = -1;
  public loading = false;
  public dataChanged: Subject<string> = new Subject<string>();
  public id = Math.floor(Math.random() * 10000);
  public selectedValue: any;
  public selectedItem: any;
  public valueInput: string;
  public onChange: any;
  public control: AbstractControl;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngOnInit(): void {

    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      }
    }

    //Listener para a atualização de itens do Autcomplete
    this.settings.onChangedSourceAutocomplete().subscribe(s => {
      this.settings.source = s;
      this.apresentarConteudo(null);
    })
  }

  ngAfterContentInit(): void {

    if (this.settings == undefined) {
      throw new Error("Não foi possível encontrar as configurações");
    }

    if (this.settings.title == "" || this.settings.title == undefined) {
      this.settings.title = "Titulo não informado";
    }

    this.dataChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(text => {
      this.loading = true;
      if (this.settings.serverData) {
        this.settings.onSearchResults(text).subscribe(
          (listaResultado: Array<AutocompleteModel>) => {
            this.settings.source = listaResultado;
            this.apresentarConteudo(text);
            this.loading = false;
          }, (error: any) => {
            this.settings.source = new Array<AutocompleteModel>();
            this.apresentarConteudo(text);
            this.loading = false;
          });
      } else {
        this.apresentarConteudo(text);
        this.loading = false;
      }
    })

    if (this.settings.source) {
      this.autocompleteModelFiltrado = Helper.cloneObjeto(this.settings.source);
      this.autocompleteModelFiltrado.map(
        element => {
          element.valueHTML = element.value;
          return element;
        });
    }
  }

  hasError() {
    if (this.settings.required) {
      return this.settings.required && !this.control.valid && this.control.touched;
    } else
      return false;
  }

  keyDown(event: KeyboardEvent) {

    switch (event.keyCode) {
      case 38: // this is the ascii of arrow up
        if (this.myDiv.nativeElement.getElementsByTagName("li")[this.valueIndex - 1]) {
          this.valueIndex--;
          this.myDiv.nativeElement.getElementsByTagName("li")[this.valueIndex].focus();
          event.preventDefault();
        }
        break;
      case 40: // this is the ascii of arrow down
        if (this.myDiv.nativeElement.getElementsByTagName("li")[this.valueIndex + 1]) {
          this.valueIndex++;
          this.myDiv.nativeElement.getElementsByTagName("li")[this.valueIndex].focus();
          event.preventDefault();
        }
        break;
      case 13: // this is the ascii of enter
        if (this.autocompleteModelFiltrado[this.valueIndex] && this.autocompleteModelFiltrado[this.valueIndex].key != '0') {
          this.selecionarItem(this.autocompleteModelFiltrado[this.valueIndex]);
          this.autocompleteModelFiltrado = null;
          this.VisualizarAutocomplete = false;
        }
    }
  }

  selecionarItem(item: AutocompleteModel) {
    if (item.naoEncontrado) {
      this.valueInput = null;
      this.selectedValue = null;
      this.selectedItem = null;
      this.selectedItemEmitter.emit(null);
      this.control.setValue(null);
      this.onChange(this.selectedValue);
    } else {
      this.selectedItem = item.value;
      this.selectedItemEmitter.emit(item.item);
      this.selectedValue = item.key;
      this.valueInput = item.value;
      this.onChange(item.key);
      this.control.setValue(item.key);
    }
  }

  visualizarAutocomplete() {
    this.VisualizarAutocomplete = true;
    this.valueIndex = -1;
  }

  mouseEnter(index) {
    if (this.myDiv.nativeElement.getElementsByTagName("li")[index]) {
      this.valueIndex = index;
      this.myDiv.nativeElement.getElementsByTagName("li")[this.valueIndex].focus();
    }
  }

  @HostListener('document:click', ['$event.target']) clickedOutside(targetElement) {
    if (targetElement.id != this.id) {
      this.VisualizarAutocomplete = false;
      let selectedValue = this.selectedValue == null || this.selectedValue == undefined || this.selectedValue.length == 0;
      let inputValue = this.valueInput == null || this.valueInput == undefined || this.valueInput.length == 0;
      if (selectedValue || inputValue) {
        this.valueInput = null;
        this.selectedValue = null;
        this.control.setValue(null);
        this.onChange(this.selectedValue);
        this.autocompleteModelFiltrado = new Array<AutocompleteModel>();
      } else if (this.selectedItem != this.valueInput) {
        this.valueInput = this.selectedItem;
      }
    }
  }

  onInputChanged(value) {
    this.dataChanged.next(value);
    this.valueInput = value;
    this.onChange(this.selectedValue);
  }

  apresentarConteudo(value) {

    if (value && this.settings.source) {
      this.autocompleteModelFiltrado = Helper.cloneObjeto(this.settings.source.filter(item => item.value.toUpperCase().includes(value.toUpperCase())));

      if (this.autocompleteModelFiltrado.length == 0) {
        let message = this.settings.emptyMessage != undefined ? this.settings.emptyMessage : `${this.settings.title} não encontrado`;
        this.autocompleteModelFiltrado.push(new AutocompleteModel("0", message, true))
      }

      this.autocompleteModelFiltrado.map(
        element => {
          element.valueHTML = element.value.replace(new RegExp(value, 'gi'), `<strong><u>${value}</u></strong>`);
          return element;
        });
    } else if (this.settings.source) {
      this.autocompleteModelFiltrado = Helper.cloneObjeto(this.settings.source);
      this.autocompleteModelFiltrado.map(
        element => {
          element.valueHTML = element.value;
          return element;
        });
    }
  }

  /*************** Métodos do ControlValueAccessor ****************/
  /**
   * Utilizada quando se deseja passar um valor para o componente
   */
  writeValue(obj: any): void {
    if (obj == null) {
      this.valueInput = obj;
      this.selectedItem = obj;
    }
    this.selectedValue = obj;
  }
  /**
   * - Função chamada sempre o que o valor interno do componente mudar
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   * Registra se o usuário entrou no componente
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {
  }
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void;

}
