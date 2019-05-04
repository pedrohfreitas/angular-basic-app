import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

  transform(value: any) {
    
    if (value) {
      var nome = value.charAt(0).toUpperCase() + value.slice(1);
      return nome;
    }
    return value;
  }

}
