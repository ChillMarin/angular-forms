import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//debounceTime da un espacio para q no cada vez q escribamos algo en el input lo busque
import { map, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  // Como solo vamos a usar un solo campo no vamos a usar el formBuilder solo 1 formControl
  searchField= new FormControl();
  results :any[]=[];

  constructor(private http: HttpClient) { }

  ngOnInit():void{
    this.searchField.valueChanges
    .pipe(
      //debounceTime da un espacio para q no cada vez q escribamos algo en el input lo busque
      debounceTime(500),
      map((value: string) => value.trim()),
      map((value: string) => value.toLowerCase()),
      map((value: string) => value.replace(' ', '-')),
    )
    .subscribe((value) => {
      console.log('value', value);
      this.getData(value);
    })
  }

  private getData(query: string){
    const API = 'G9dYGBz83l1OShlzFMQjBmVkzG5rvm1z';

    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      // a la respeusta q recibimos usamos map para transformarla y obtener el valor deseado
      map( (response: any) => {
        // el .map aqui lo que hace es iterar por cada uno de lso items es uso de arraya nativo de js
        return response.data.map((item: { images: { downsized: any; }; }) => item.images.downsized)
      })
    )
    .subscribe((data) => {
      console.log('data', data);
      this.results = data;
    })
  }
  
}
