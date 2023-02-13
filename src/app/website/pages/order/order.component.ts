import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;
  form!: FormGroup;

  @Input()
color: ThemePalette

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder
  ) {
    this.products$ = this.storeService.myCart$;
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      // le decimos que es un array de campos que inicia con 0 campos
      address: this.formBuilder.array([])
    });
  }

  // metodo que cada vez que se le hace click genera el nuevo elemento
  addAddressField() {
    // enviamos un fromBuild.group
    // tambien podemos enviar 1 solo elemento usando new FormControl() y le enviamso el elemento
    this.addressField.push(this.createAddressField());
  }

  private createAddressField() {
    return this.formBuilder.group({
      zip: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  get addressField() {
    // como es un array tenemos que importar FormArray para que pueda ser utilziado ese ocmportamiento
    // sin el formArray seria un abstrac control
    return this.form.get('address') as FormArray;
  }

  save() {
    console.log(this.form.value);
  }

}
