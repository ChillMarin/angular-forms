import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  // BehaviorSubject es un tipo de Observable que permite almacenar un valor inicial y emitirlo a los subscriptores cuando se suscriben por primera vez es decir, cuando se crea el componente que lo usa por primera vez y cuando se crea el servicio que lo usa por primera vez tambien se crea el BehaviorSubject y se emite el valor inicial que es el arreglo vacio de productos en el carrito de compras es decir recibe Product[] y el array ([]) es el valor inicial
  private myCart = new BehaviorSubject<Product[]>([]);

  //este metodo se usa en el componente para obtener el observable del carrito de compras y asi poder usarlo en el componente para suscribirse a el y asi poder recibir los cambios en el carrito de compras y asi poder actualizar el total del carrito de compras
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    // con next se emite el valor del carrito de compras al componente que lo esta usando para que se actualice el total
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
