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
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');
  monthField = new FormControl('');
  ageField = new FormControl(12);
  passwordField = new FormControl('');
  priceField = new FormControl('50');
  weekField = new FormControl('');
  timefield = new FormControl('');
  searchField = new FormControl('');
  descriptionField = new FormControl('');

  categoryField = new FormControl('category-4');
  tagsField = new FormControl(['tag-1', 'tag-3']);

  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');

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
