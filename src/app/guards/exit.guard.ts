import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// el OnExit es una interface que se crea para que el componente que se va a desactivar tenga que implementar la interface
export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // funciona gual con un return o un false.
      // si esta en false no le voy a permitir salir
      // el confirm es nativo de javascript
      // y esto seria sencillo hasta aqui si solo quiero desde el guard colocar la logica de salir
   // const rta = confirm('Estas seguro de salir?')
    return component.onExit ? component.onExit() : true;
  }

}
