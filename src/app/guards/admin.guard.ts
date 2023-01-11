import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


      this.authService.getRol().subscribe(res => {
        if (res.role === 'admin') {
          return true;
        }
        return false
      });


      return this.authService.user$.pipe(
        // nos permite transformar ese observable de tipo true or false es decir a user$ lo transforma para decirnos si es true o false
        map((user) => {
          // se coloca el ? para que no de error si no existe el usuario
          if (user?.role === 'admin') {
            return true;
          }
          // si no es admin lo redirigimos a la pagina principal
          this.router.navigate(['/']);
          return false;
        })
      );
  }
}
