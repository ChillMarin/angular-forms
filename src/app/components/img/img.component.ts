import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-img',
	templateUrl: './img.component.html',
	styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

	@Input() img: string = '';
	// El parametro <string> lo que hace es darle significado  a que tipo de valor vamos a enviar. En caso de que el valor a enviar no sea un string, entonces el parametro <string> es opcional. Si no se le asigna ningun tipo de valor, entonces el parametro es de tipo any.
	@Output() loaded = new EventEmitter<string>()
	// https://www.w3schools.com/w3css/img_lights.jpg
	imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

	constructor() {
    //before and during render
    //No async -- once time
		console.log('contructor','imgValue =>',this.img);
	}

  ngOnChanges() {
    //before render
    //No async -- many times
    console.log('ngOnChanges','imgValue =>',this.img);
  }

  ngOnInit() {
    //after render
    //async -- once time
    console.log('ngOnInit','imgValue =>',this.img);
  }

  ngAfterViewInit() {
    //after render
    // handle children
    //async -- once time
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    //delete
    //async -- once time
    console.log('ngOnDestroy');
  }

	imgError() {
		this.img = this.imageDefault;
	}

	imgLoaded() {
		console.log('Image loaded! del hijo');
		this.loaded.emit('Esto es un string que voy a enviar y la url de la imagen '+this.img);
	}
}
