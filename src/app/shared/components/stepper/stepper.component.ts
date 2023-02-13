import { Component, OnInit, forwardRef } from '@angular/core';
//interfaz de controlValuAccesor nos obliga a implementarla en el implementspara que se pueda unir a l api de reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  // agregar esto de providers es obligatorio para decrile que lo agregue al api de reactive forms el componente
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor{
  currentValue = 0;
  //funciones vacias
  onChange = (_: any) => { };
  onTouch = () => { };
  //usando tmb por el api para saber si quiere desasctivar el componente
  isDisabled: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.currentValue++;
    // le damos un estado al comenente de q a sido tocado
    this.onTouch();
    // le damos un estado al comenente de q a sido cambiado y le enviamos el valor
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue--;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  // metodos de reactive forms q se copiaron y pegaron
  // en el wirte value se recibe el valor y se coloca ese valor nuevo es decir lo actualiza
  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  // estos otros metodos nos sirven para ejecutar otras opciones, pero por los momentos los dejamos en vacio
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
