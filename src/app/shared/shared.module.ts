import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular'; 

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from './components/img/img.component';
import { StepperComponent } from './components/stepper/stepper.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    StepperComponent
  ]
})
export class SharedModule { }
