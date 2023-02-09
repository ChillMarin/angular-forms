import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsAdminComponent } from './pages/products/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductCreateComponent } from './pages/products/components/product-create/product-create.component';
import { ProductEditComponent } from './pages/products/components/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid',
        component: GridComponent,
      },
      {
        path: 'product',
        component: ProductsAdminComponent,
      },
      {
        path: 'product/create',
        component: ProductCreateComponent,
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'basic-form',
        component: BasicFormComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'grid/edit/:id',
        component: CategoryComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
