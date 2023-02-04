import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Category } from './../models/category.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/categories`;
  private apiNueva = 'https://api.escuelajs.co/api/v1/categories'

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Category[]>(this.apiUrl, { params });
  }

  // recibimos la data y usamos Partial para que el Id no sea obligatorio, con partical le decimos nos traemos es una parte de <Category>
  createCategory(data: Partial<Category>){
    return this.http.post<Category>(this.apiNueva, data);
  }

  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category>(`${this.apiNueva}/${id}`, data);
  }
}
