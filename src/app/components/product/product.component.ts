import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product= {
    id: '',
    title: '',
    image: '',
    price: 0,
    description: '',
    category: ''
  };
  //Emite un evento cuando se agrega un producto al carrito
  @Output() addedProduct = new EventEmitter<Product> ();

  onAddToCart() {
    //envia el producto al componente padre
    this.addedProduct.emit(this.product);
  }

}
