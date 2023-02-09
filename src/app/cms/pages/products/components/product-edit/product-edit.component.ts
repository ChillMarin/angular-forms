import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { MyValidators } from 'src/app/shared/utils/validators';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  categories: Category[] = [];
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue({
          ...product,
          category:{
            id: product.category.id,
            name: product.category.name
          },
          // para enviar al backedn el estado le colocamos un state por defecto el de la posicion 2
          state: this.states[2]
        });
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
      // this.productsService.updateProduct(this.id, product)
      // .subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['./admin/products']);
      // });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  private getCategories() {
    this.categoriesService.getAll()
    .subscribe((data) => {
      this.categories = data;
    });
  }
}
