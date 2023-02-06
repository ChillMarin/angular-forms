import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators'; 

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit{

  categories: Category[] = [];
	displayedColumns: string[] = ['id', 'name', 'image', 'actions']

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoriesService.getAll().pipe(first()).subscribe(categories => {
      this.categories = categories
    })
  }


}
