import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  // Esto es un controlador de formulario, que se encarga de manejar el estado de un campo de formulario
  nameField = new FormControl('Soy un control o valor por default');

  ngOnInit(): void {
    // El controlador de formulario tiene un observable que se dispara cada vez que cambia el valor del campo
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    }
    );
  }

  getNameValue(){
    console.log(this.nameField.value);
    
  }
}
