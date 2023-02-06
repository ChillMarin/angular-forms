import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './pages/category/category.component';

//material
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    BasicFormComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule
  ]
})
export class CmsModule { }
