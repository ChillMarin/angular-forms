import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //aqui obtemos el token para saber si el usuario esta logeado
    // const token = this.tokenService.getToken();
    // if (!token) {
    //   this.router.navigate(['/']);
    //   return false
    // }
    // return true;

    //aqui usamos el servicio de auth para saber si el usuario esta logeado
    return this.authService.user$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
