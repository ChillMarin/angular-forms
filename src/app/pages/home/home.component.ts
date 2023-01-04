import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  productId : string | null = null;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMore();
    // recibir parametros via url por query params
    this.queryParams();
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

  queryParams(){
    //recibir parametros via url por query params
    this.route.queryParamMap.subscribe((params) => {
      //'product' es el nombre del parametro que se envia por url
      this.productId = params.get('product');
      console.log('qlqlqlqlqlql',this.productId);

    });
  }
}
