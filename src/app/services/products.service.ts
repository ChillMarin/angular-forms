import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor( private http: HttpClient) { }

// esta seria la otra manera de traerme productos dinamicamente si no se sabe cuantos son y se quiere traerlos de a 10 por ejemplo y se quiere ir paginando o si quiero que me traiga todos no le envio valores porque son opciones
  getAllProducts(limit?: number, offset?: number) {
    //Aqui le decimos que lo que solicitamos es un arreglo de productos. Tambien puedo decir qeu me devuleve no un array de productos como esta ahorita si no que me devuelve un objeto de tipo Product y que es un arreglo de productos usando el operador <Product[]> sin "[]" seria solo 1 producto
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.append('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{params});
  }

  getProduct(id: string) {
    //aqui lo tipamos como 1 producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{params:{limit,offset}});
  }

  create(data: CreateProductDTO){
    //aqui lo tipamos como 1 producto y le pasamos el objeto que creamos en el componente y luego recibimos la respuesta del servidor como 1 Producto
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id:string){
    // En este caso la api devuelve un boolean de que paso, no todas las APIS lo hacen
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
