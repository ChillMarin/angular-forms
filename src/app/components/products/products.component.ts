import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2022,1,21);

   //aqui se declaran los servicios que se usan en el componente
  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    //Como la solicitud es asincrona, se usa el metodo subscribe para recibir la respuesta
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product) {
    //console.log('onAddToCart',product);
   // this.myShoppingCart.push(product);
    //reduce() es un metodo de los arreglos que recibe una funcion para sumar los valores de un arreglo
    //this.total = this.myShoppingCart.reduce((acc, product) => acc + product.price, 0);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
