import { Component, OnInit, ContentChild, Input, AfterContentInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'basic-input-with-errors',
  templateUrl: './input-with-errors.component.html',
  styleUrls: ['./input-with-errors.component.css']
})
export class InputWithErrorsComponent implements OnInit, AfterContentInit {

  input: any;
  @Input() label: string;
  @Input() showTip: boolean = true;

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com usa diretiva NgModel ou FormControlName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched);
  }

  messageError(): string {

    if (!this.input.errors)
      return '';

    if (this.input.errors.required != null) {
      return "Campo obrigatório";
    }

    if (this.input.errors.minlength != null || this.input.maxlength != null) {
      return "O tamanho do campo é inválido";
    }

    if (this.input.errors.email != null) {
      return "Campo e-mail é inválido";
    }

    return "Campo inválido";
  }

}
