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
        confirmPassword: ['', [Validators.required]],
        type: [['Company', [Validators.required]]],
        companyName:['',  [Validators.required]]
      },
      {
        // para poder hacer la validaciones grupales
        validators: MyValidators.matchPasswords,
      });

      // escuchamos los cambios del radio button
      this.typeField?.valueChanges.subscribe(value => {
        console.log(value);
        
        if (value === 'Company') {
          this.companyNameField?.setValidators([Validators.required]);
        } else {
          // le decimos que no hay validaciones, tmb le puedo decir setValidators(null)
          this.companyNameField?.clearValidators();
        }
        // aqui le decimos que actualice el valor y lo revalide es muy importante para q funcione bien la reactividad
        this.companyNameField?.updateValueAndValidity();
      }
      );
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get typeField() {
    return this.form.get('type');
  }

  get companyNameField() {
    return this.form.get('companyName');
  }

  get emailFieldInvalid() {
    return this.emailField?.invalid && this.emailField?.touched;
  }

  get passwordFieldInvalid() {
    return this.passwordField?.invalid && this.passwordField?.touched;
  }

  get confirmPasswordFieldInvalid() {
    return (
      this.confirmPasswordField?.invalid && this.confirmPasswordField?.touched
    );
  }

  get typeFieldInvalid() {
    return this.typeField?.invalid && this.typeField?.touched;
  }

  get companyNameFieldInvalid() {
    return this.companyNameField?.invalid && this.companyNameField?.touched;
  }

  get passwordFieldRequired() {
    return (
      this.passwordField?.hasError('required') &&
      this.passwordField?.touched &&
      this.passwordField?.dirty
    );
  }
}
