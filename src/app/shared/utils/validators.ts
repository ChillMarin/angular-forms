import { AbstractControl } from '@angular/forms';

export class MyValidators { 

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    //evaluar si el password tiene un numero
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;
  }

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }

}

//funcion para evaluar si el password tiene un numero
function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  //evalua si el valor es un numero y lo convierte a entero y si no es un numero retorna false usando el metodo isNaN, es decir isNaN retorna true si el valor no es un numero poreso se coloca el !
  return !isNaN(parseInt(value, 10));
}