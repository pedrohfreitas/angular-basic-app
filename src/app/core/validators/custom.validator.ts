import { FormControl, AbstractControl } from '@angular/forms';

export class CustomValidator {

  static CEPValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: String = control.value.toString().replace(/[^0-9]/g, '').slice(0, 8);

    if (value.length != 8) {
      return {
        "CEPinvalid": true
      };
    }

    return null;
  }

  static CelularValidator(control: FormControl) {
    var value: String = control.value.toString().replace(/[^0-9]/g, '').slice(0, 15);
    if (value.length != 11) {
      return {
        "celularInvalid": true
      };
    }

    return null;
  }

  static TelefoneValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }


    var value: String = control.value.toString().replace(/[^0-9]/g, '').slice(0, 14);

    //Valida somente se o telefone é valido. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    if (value.length != 10 && value.length != 9 && value.length != 8) {
      return {
        "telefoneInvalid": true
      };
    }

    return null;
  }

  static DataValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: any = control.value.toString();

    let ano = value.split('/')[2];
    let mes = value.split('/')[1];
    let dia = value.split('/')[0];
    let data = new Date(ano, mes - 1, dia);

    if (!data.getDate()) {
      return {
        "dataInvalid": true
      };
    }

    if (data.getFullYear() < (new Date().getFullYear() - 100) || data.getFullYear() > (new Date().getFullYear() + 100)) {
      return {
        "dataInvalid": true
      };
    }

    return null;
  }

  static DataMenorAtualValidator(control: FormControl) {
    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    let ano = value.split('/')[2];
    let mes = value.split('/')[1];
    let dia = value.split('/')[0];
    let data = new Date(ano, mes - 1, dia);

    if (!data.getDate()) {
      return {
        "dataMenorAtualInvalid": true
      };
    }

    if (data.getFullYear() < (new Date().getFullYear() - 100) || data > new Date()) {
      return {
        "dataMenorAtualInvalid": true
      };
    }

    return null;
  }

  static NumeroNegativoValidator(control: FormControl) {
    var value: number = control.value.toString().replace(/[^0-9]/g, '');

    if (value < 0) {
      return {
        "numeroInvalid": true
      };
    }

    return null;
  }

  static SelectValidator(control: FormControl) {
    var value: number = control.value.toString();

    if (value == 0) {
      return {
        "SelectInvalid": true
      };
    }

    return null;
  }

  static CPFValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }

    var cpf = control.value.toString().replace(/[^\d]+/g, '');
    if (cpf == '') {
      return null;
    }
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999") {
      return {
        "cpfInvalid": true
      };
    }
    // Valida 1o digito
    var add = 0;
    for (var i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9))) {
      return {
        "cpfInvalid": true
      };
    }
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10))) {
      return {
        "cpfInvalid": true
      };
    }
    return null;
  }

  static CNPJValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }

    var cnpj = control.value.toString().replace(/[^\d]+/g, '');

    if (cnpj == '') {
      return {
        "cnpjInvalid": true
      };
    }

    if (cnpj.length != 14) {
      return {
        "cnpjInvalid": true
      };
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999") {
      return {
        "cnpjInvalid": true
      };
    }

    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
      return {
        "cnpjInvalid": true
      };
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return {
        "cnpjInvalid": true
      };
    }

    return null;
  }

  static DataMenorQueValidator(control: FormControl, dateToCompare) {
    if (control.value == null) {
      return null;
    }

    if (dateToCompare == null) {
      return null;
    }

    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    let ano = value.split('/')[2];
    let mes = value.split('/')[1];
    let dia = value.split('/')[0];
    let data = new Date(ano, mes - 1, dia);

    if (!data.getDate()) {
      return {
        "dataMenorQueInvalid": true
      };
    }

    if (data.getFullYear() < (dateToCompare.getFullYear() - 100) || data > dateToCompare) {
      return {
        "dataMenorQueInvalid": true
      };
    }

    return null;
  }

  static DataBootstrapValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: any = control.value;

    let date = new Date(value.year, value.month - 1, value.day);

    if (!date.getDate()) {
      return {
        "dataBootstrapInvalid": true
      };
    }

    if (date.getFullYear() < (new Date().getFullYear() - 100) || date.getFullYear() > (new Date().getFullYear() + 100)) {
      return {
        "dataBootstrapInvalid": true
      };
    }

    return null;
  }

  static DataMaiorMaskQueValidator(control: FormControl, dateToCompare) {
    if (control.value == null) {
      return null;
    }

    if (dateToCompare == null) {
      return null;
    }

    var value: any = control.value.replace(/\D/g, '');

    if (value.length == 0)
      return null;

    if (value.length != 8) {
      return {
        "dataMaiorMaskQueInvalid": true
      };
    }

    let ano = value.slice(4, 8);
    let mes = value.slice(2, 4);
    let dia = value.slice(0, 2);
    let data = new Date(ano, mes - 1, dia);

    if (!data.getDate()) {
      return {
        "dataMaiorMaskQueInvalid": true
      };
    }

    if (data.getFullYear() < (dateToCompare.getFullYear() - 100) || data > dateToCompare) {
      return {
        "dataMaiorMaskQueInvalid": true
      };
    }

    return null;
  }

  static ValueOtherThan(control: FormControl, valueOther) {
    if (control.value == null) {
      return null;
    }
    var currentValue: any = control.value;

    if (currentValue == valueOther) {
      return {
        "valueOtherThanInvalid": true
      };
    }
    return null;
  }

  static MinLength(control: FormControl, length) {
    if (control.value == null) {
      return null;
    }
    var currentValue: any = control.value.replace(/\D/g, '');
    if (currentValue.length != length) {
      return {
        "minLengthInvalid": true
      };
    }
    return null;
  }

  static DataMaiorQueValidator(control: FormControl, dateToCompare) {
    if (control.value == null) {
      return null;
    }

    if (dateToCompare == null) {
      return null;
    }

    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    var value: any = new Date(control.value);

    let date = new Date(value.year, value.month - 1, value.day);

    if (!value.getDate()) {
      return {
        "dataMaiorQueValidatorInvalid": true
      };
    }
    if (date.getFullYear() < (dateToCompare.getFullYear() - 100) || date > dateToCompare) {
      return {
        "dataMaiorQueValidatorInvalid": true
      };
    }

    return null;
  }

  static DataMaiorIgualQueValidator(control: FormControl, dateToCompare) {
    if (control.value == null) {
      return null;
    }

    if (dateToCompare == null) {
      return null;
    }

    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    var value: any = new Date(control.value);

    //let date = new Date(value.year, value.month - 1, value.day);

    if (!value.getDate()) {
      return {
        "dataMaiorQueValidatorInvalid": true
      };
    }
    if (value.getFullYear() < (dateToCompare.getFullYear() - 100) || value >= dateToCompare) {
      return {
        "dataMaiorQueValidatorInvalid": true
      };
    }

    return null;
  }

  static IfTheParameterIsTrue(control: FormControl | AbstractControl, condiction) {
    if (condiction) {
      if (control.value == null) {
        return {
          "ifTheParameterIsTrueInvalid": true
        };
      }
      if (control.value.length <= 0) {
        return {
          "ifTheParameterIsTrueInvalid": true
        };
      }
    }

    return null;
  }

  static DataWithMaskValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: any = control.value.replace(/\D/g, '');

    if (value.length == 0)
      return null;

    if (value.length != 8) {
      return {
        "dataWithMaskInvalid": true
      };
    }

    let ano = value.slice(4, 8);
    let mes = value.slice(2, 4);
    let dia = value.slice(0, 2);
    let data = new Date(ano, mes - 1, dia);

    if (!data.getDate()) {
      return {
        "dataWithMaskInvalid": true
      };
    }

    if (data.getFullYear() < (new Date().getFullYear() - 100) || data.getFullYear() > (new Date().getFullYear() + 100)) {
      return {
        "dataWithMaskInvalid": true
      };
    }

    return null;
  }

  static NoWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'noWhitespaceInvalid': true }
  }

  static NoWhitespaceBefore(control: FormControl) {
    let isValid = false;
    if (control.value) {
      let isWhitespace = (control.value.toString() || '').trim().length === 0;
      let starsWith = control.value.toString().substring(0, 1) === ' ';
      isValid = !isWhitespace && !starsWith;
    }
    return isValid ? null : { 'noWhitespaceBeforeInvalid': true }
  }

  static TimeBootstrapValidator(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: any = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 0) {
      return { timeBootstrapInvalid: true };
    }
    if (value.hour > 24) {
      return { timeBootstrapInvalid: true };
    }

    return null;
  }

  static HoraMaiorIgualQueValidator(control: FormControl, timeToCompare) {
    if (control.value == null) {
      return null;
    }

    if (timeToCompare == null) {
      return null;
    }

    if (timeToCompare.length == 0) {
      return null;
    }

    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    if (value >= timeToCompare) {
      return {
        "horaMaiorIgualQueInvalid": true
      };
    }

    return null;
  }

  static HoraMenorIgualQueValidator(control: FormControl, timeToCompare) {
    if (control.value == null) {
      return null;
    }

    if (timeToCompare == null) {
      return null;
    }

    if (timeToCompare.length == 0) {
      return null;
    }

    var value: any = control.value.toString();

    //Valida somente se a data é valida. Para validar se ele é obrigatório, usar o required
    if (value.length == 0)
      return null;

    if (value <= timeToCompare) {
      return {
        "horaMenorIgualQueInvalid": true
      };
    }
  }

  static DataHoraHtl(control: FormControl) {
    if (control.value == null) {
      return null;
    }
    var value: any = control.value;
    if (!value)
      return null;
    let parse = Date.parse(value);
    if (parse == NaN)
      return {
        "dataHoraHtlInvalid": true
      };

    let data = new Date(value);

    if (!data.getDate()) {
      return {
        "dataHoraHtlInvalid": true
      };
    }

    return null;
  }

  static InscricaoEnem(control: FormControl) {
    if (control.value == null)
      return null;

    var value: any = control.value.toString();

    if (value.length == 0)
      return null;

    value = value.replace(/\D/g, '');
    if (value.length != 12) {
      return {
        "enemInvalid": true
      };
    }
    return null;
  }
 
  static ValidaEstado(control: AbstractControl, estados: string[]) {
    if (estados == null || estados.length == 0 || control.value == null)
      return null;

    let estadoExist = false;

    estados.forEach(element => {
      if(control.value.toString() == element){
        estadoExist = true;
      }
    });

    if (!estadoExist) {
      console.log("estado inválido")
      return {
        "estadoInvalid": true
      };
    }
    return null;
  }
}
