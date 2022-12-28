import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // el id de la categoria se obtiene de la ruta es decir de la que se coloco en el archivo routing.module.ts
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.productsService.getByCategory(this.categoryId,this.limit,this.offset)
        .subscribe(data => {
          this.products = data;
        });
      }
    });
  }
}
