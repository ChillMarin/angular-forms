import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  //Variables para limitar cantidad de productos y hacer paginacion
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        //Aqui como estamos es cargando mas usamos concat para concatener los nuevos productos con los que ya teniamos pero genera un nuevo array y no modifica el array original
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
