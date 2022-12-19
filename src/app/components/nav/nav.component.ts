import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from '../../services/store.service'

import { switchMap } from 'rxjs/operators';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token='';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('jamon@mail.com', '12345678')
      .pipe(
        switchMap((token) => {
          this.token = token.access_token;
          return this.authService.profile(token.access_token);
        })
      )
      .subscribe(user => {
        this.profile = user;
      });
  }

}
