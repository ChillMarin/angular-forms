import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Aqui lo que tiene que pasar es que antes de que se ejecute el servicio que se esta llamando en el componente se tiene que ejecutar este interceptor y este interceptor tiene que agregar el token en el header de la peticion antes de que se ejecute el servicio

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if (token) {
      // Aqui se esta agregando el token en el header de la peticion
      // el clone clona la peticion y le agrega el token en el header
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return authReq;
    }
    // si no pasa por if solo retorna el request y si no pasa por el if es debido que el usuario no esta logeadao y no posee el token
    return request;
  }
}
