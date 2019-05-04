import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cep' })
export class Cep implements PipeTransform {
  transform(value: any, args: string[]): any {
    if (!value)
      return '';

    return value.replace(/(\d{5})(\d{3})/g, "\$1-\$2");
  }
}
