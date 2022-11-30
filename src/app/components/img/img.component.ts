import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img: string = '';
  // El parametro <string> lo que hace es darle significado  a que tipo de valor vamos a enviar. En caso de que el valor a enviar no sea un string, entonces el parametro <string> es opcional. Si no se le asigna ningun tipo de valor, entonces el parametro es de tipo any.
  @Output() loaded = new EventEmitter<string>()
  // https://www.w3schools.com/w3css/img_lights.jpg
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('Image loaded! del hijo');
    this.loaded.emit('Esto es un string que voy a enviar y la url de la imagen '+this.img);
  }
}
