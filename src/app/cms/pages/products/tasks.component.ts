import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  products: any = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'price', 'actions'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.productsService.delete(id)
    .subscribe(rta => {
      this.fetchProducts();
    });
  }

}
