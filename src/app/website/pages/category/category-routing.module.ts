import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
     //:id es un parámetro que se puede pasar a la ruta para validar el id de la categoria que queremos mostrar
    path: ':id',
    component: CategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
