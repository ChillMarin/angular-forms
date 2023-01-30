import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    BasicFormComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
