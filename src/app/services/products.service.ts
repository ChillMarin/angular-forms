import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
//Libreria para manejrar errores de rxjs
import { retry, catchError, map } from 'rxjs/operators';
// para enviar errores al fronted
import { throwError } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;

  constructor( private http: HttpClient) { }

// esta seria la otra manera de traerme productos dinamicamente si no se sabe cuantos son y se quiere traerlos de a 10 por ejemplo y se quiere ir paginando o si quiero que me traiga todos no le envio valores porque son opciones
  getAllProducts(limit?: number, offset?: number) {
    //Aqui le decimos que lo que solicitamos es un arreglo de productos. Tambien puedo decir qeu me devuleve no un array de productos como esta ahorita si no que me devuelve un objeto de tipo Product y que es un arreglo de productos usando el operador <Product[]> sin "[]" seria solo 1 producto
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.append('offset', offset);
    }
    // el map es agarra los valores del observable para transformarlos y products es la data que nos estan enviando o que estamos recibiendo y el 2do map es el nativo de javascript ojo el 1er map es el que importamos de rxjs
    //Aqui lo que hacemos es agarrar la data y agregarle un nuevo campo llamado taxes que es el iva del producto eso es lo qeu llamamos (Transformacion de datos)
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) {
    //aqui lo tipamos como 1 producto
    return this.http.get<Product>(`${this.apiUrl}/products/${id}123123`)
    .pipe(
     catchError((error: HttpErrorResponse) => {
      if (error.status === 500){
        // Asi es como se deberian de hacer el throw de los errores que te envia el error completo en la consola
        return throwError(() => new Error ('Error en el servidor'));
      }
      if (error.status === 404){
        return throwError('El producto no existe');
      }
      return throwError('Error desconocido');
    }))
  }

  getByCategory(categoryId: string,limit:number, offset:number){
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.append('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`,{params:{limit,offset}});
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{params:{limit,offset}});
  }

  create(data: CreateProductDTO){
    //aqui lo tipamos como 1 producto y le pasamos el objeto que creamos en el componente y luego recibimos la respuesta del servidor como 1 Producto
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id:string){
    // En este caso la api devuelve un boolean de que paso, no todas las APIS lo hacen
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  /*
  Dejo los codigos de los servicios que hice para que se entienda mejor como se usa el operador zip y el switchMap desde el lado del servicio
      fetchReadAndUpdate(id: string, dto:UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }

  getProductAndupdate(id: string, dto:UpdateProductDTO){
    return this.getProduct(id)
      .pipe(
        switchMap((product) => this.update(product.id, dto))
      )
  }

Y tambien como los llamo del lado del componente:

  readAndUpdate(id: string){
    this.productsService.getProductAndupdate(id, {title: 'change'})
      .subscribe(data => {
        console.log(data);
      });

    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const product = response[0];
      const update = response[1];
    })

  }

  */
}
