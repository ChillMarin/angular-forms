import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product= {
    id: '',
    title: '',
    images:[],
    price: 0,
    description: '',
    category: {
      id: '',
      name: ''
    }
  };
  //Emite un evento cuando se agrega un producto al carrito
  @Output() addedProduct = new EventEmitter<Product> ();
  @Output() showProduct = new EventEmitter<string> ();

  onAddToCart() {
    //envia el producto al componente padre
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
