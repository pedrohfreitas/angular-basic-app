import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'telefone' })
export class TelefonePipe implements PipeTransform {
  transform(tel: any, args: string[]): any {
    if (tel == undefined)
      return '';

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var str = value + '';
    str = str.replace(/\D/g, '');
    if (str.length === 9) {
      str = str.slice(0, 5) + '-' + str.slice(5, 9);
    }
    else if (str.length === 11) {
      str = '(' + str.slice(0, 2) + ')' + str.slice(2, 7) + '-' + str.slice(7, 11);
    } else {
      str = str.slice(0, 4) + '-' + str.slice(4, 8);
    }
    return str;
  }
}
