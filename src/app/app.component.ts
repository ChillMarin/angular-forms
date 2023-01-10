import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  // modificamos esto para decirle que use el template que creamos
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'my-store';
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
    }

  onLoaded(img: string) {
    console.log('Image loaded! del padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Jamon',
        email: 'jamon@mail.com',
        password: '12345678',
        role: 'user',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('jamon@mail.com', '12345678').subscribe((rta) => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((profile) => {
      console.log(profile);
    });
  }
}
