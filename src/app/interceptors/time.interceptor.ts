import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// Nos deja correr un proceso sin tener que modificar el observable
import { tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //el perfomance es una funcionalidad del navegador evalua el tiempo inicial
    const start = performance.now();
    // el next es el siguiente interceptor o el servicio que se va a ejecutar y como esto viene siendo un observable podemos hacer un pipe
    // tap es un operador que nos permite ejecutar un proceso sin tener que modificar el observable que se esta retornando es decir no necesita un return
    return next.handle(request)
    .pipe(
      tap(() => {
        const time = (performance.now() - start)+ 'ms';
        console.log(request.url, time);
      })
    );
  }
}
