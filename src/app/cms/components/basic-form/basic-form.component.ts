import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  // Esto es un controlador de formulario, que se encarga de manejar el estado de un campo de formulario
  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
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

  get isNameFieldValid(){
    return this.nameField.valid && this.nameField.touched;
  }

  get isNameFieldInvalid(){
    return this.nameField.invalid && this.nameField.touched;
  }
}
