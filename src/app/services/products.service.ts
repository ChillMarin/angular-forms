import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient) { }

  getAllProducts() {
    //Aqui le decimos que lo que solicitamos es un arreglo de productos. Tambien puedo decir qeu me devuleve no un array de productos como esta ahorita si no que me devuelve un objeto de tipo Product y que es un arreglo de productos usando el operador <Product[]> sin "[]" seria solo 1 producto
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
}
