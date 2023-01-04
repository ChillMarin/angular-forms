import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  // id del producto que recibo por url
  productId : string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productsService.getByCategory(this.categoryId,this.limit,this.offset)
        }
        // coloco el return vacio porque seria como un else y tambien el switchMap espera un observable y si no recibe nada pues sera el array vacio
        return [];
      }),
      // asi quedaria si quiero anidar mas switchMap para recibir otra respuesta y asi sucesivamente
      // switchMap(params => {
      //   this.categoryId = params.get('id');
      //   if (this.categoryId) {
      //     return this.productsService.getByCategory(this.categoryId,this.limit,this.offset)
      //   }
      //   // coloco el return vacio porque seria como un else y tambien el switchMap espera un observable y si no recibe nada pues sera el array vacio
      //   return [];
      // })
    )
    .subscribe((data) => {
      this.products = data;
    });

    // recibir parametros via url por query params
    this.queryParams();
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
