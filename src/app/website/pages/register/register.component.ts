import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from './../../../shared/utils/validators';

import { OnExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnExit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  register(event: Event) {
    event.preventDefault();
  }

  onExit() {
    const rta = confirm('Estas seguro de salir? desde el componente');
    return rta;
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            // validamos que el password tenga un numero
            MyValidators.validPassword,
          ],
        ],
        confirmPassword: ['', [Validators.required, ]],
      },
      {
        // para poder hacer la validaciones grupales
        validators: MyValidators.matchPasswords,
      }
    );
  }
}
