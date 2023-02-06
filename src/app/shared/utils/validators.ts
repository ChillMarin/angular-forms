import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

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
    //obtenemos el valor del password y del confirmPassword ya que son campos del formulario
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }

  //validar categoria
  // y recibidmos como parametro el servicio de categori service para poder usarlo, ojo esto no es una inyeccion de dependencias
  static validateCategory(service: CategoriesService) {
    console.log('llegue al validtor');
    
    return (control: AbstractControl) => {
      console.log('llegue al abstracControl');
      
      //assigno en un variable el valor del input (que seria el nombre de la categoria)
      const value = control.value;
      // llamo al metodo que me devuelve la categoria
      if(service.checkCategory(value)){
        return of ({category_exist: true});
      }
      return of (null)
    };
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