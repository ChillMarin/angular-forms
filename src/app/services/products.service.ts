import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor( private http: HttpClient) { }

  getAllProducts() {
    //Aqui le decimos que lo que solicitamos es un arreglo de productos. Tambien puedo decir qeu me devuleve no un array de productos como esta ahorita si no que me devuelve un objeto de tipo Product y que es un arreglo de productos usando el operador <Product[]> sin "[]" seria solo 1 producto
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string) {
    //aqui lo tipamos como 1 producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateProductDTO){
    //aqui lo tipamos como 1 producto y le pasamos el objeto que creamos en el componente y luego recibimos la respuesta del servidor como 1 Producto
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
}
