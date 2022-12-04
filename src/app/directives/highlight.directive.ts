import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    //despues de usar nativeElement se puede usar cualquier metodo de la API de DOM nativo de JS
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave')onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = 'white';
  }


  constructor(private element: ElementRef) {
   // this.element.nativeElement.style.backgroundColor = 'yellow';
  }

}
