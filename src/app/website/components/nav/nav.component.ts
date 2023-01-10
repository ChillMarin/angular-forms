import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from '../../../services/store.service';
import { CategoriesService } from '../../../services/categories.service';

import { switchMap } from 'rxjs/operators';

import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();

    // solicitamos a ver si hay un user logeado
    this.authService.user$.subscribe((user) => {
      this.profile = user;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('sebas@mail.com', '1212')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService
      .loginAndGet('sebas@mail.com', '1212')
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/']);
  }
}
