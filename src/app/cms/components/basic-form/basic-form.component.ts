import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  // le digo q no va a ser nulo
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // mandamos a contruir el formulario
    this.BuildForm();
  }

  ngOnInit(): void {
    this.nameField?.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // aqui nos enviaria todos los cambios del formulario con cualquier cambio que se haga
    // this.form.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  getNameValue() {
    console.log(this.nameField?.value);
  }

  save(event: Event) {
    // Validacion de formulario
    // Aqui marcamos todos los input como que fueron tocados para que muestren sus errores en caso de  que no lso tocaron
    this.form.markAllAsTouched();
    // entonces si hay un campo con error no se va a enviar el formularop
    if (this.form.invalid) {
      return;
    }
    // si todo ok enviamos
    console.log(this.form.value);
  }

  private BuildForm() {
    // haciendo esto evitamos crear FormControl por cada campo
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [18, [Validators.min(18), Validators.max(60)]],
      category: [''],
      tag: [''],
      agree: [false, Validators.requiredTrue], // true Tiene que ser true
      gender: [''],
      zone: [''],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get isNameFieldValid() {
    return this.nameField?.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField?.touched && this.nameField.invalid;
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }
}
