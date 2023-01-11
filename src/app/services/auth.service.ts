import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders();

  private apiUrl = `${environment.API_URL}/api/auth`;
  // aqui declaramos que user va a hacer un observable y con estado inicial null
  private user = new BehaviorSubject<User | null>(null);
  //aqui permitimos que otras componentes se puedan subscribir a user, se usa el signo $ porque asi se reconocen los observadorees por convencion
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    // el pipe nos permite ejecutar un proceso sin tener que modificar el observable que se esta retornando es decir no necesita un return y el tap es un operador que nos permite ejecutar un proceso sin tener que modificar el observable que se esta retornando es decir no necesita un return
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  // recibimos el token de cuando el usuario se loguea y lo enviamos en el header de la peticion para que el servidor sepa que usuario esta haciendo la peticion y asi poder devolvernos la informacion del usuario que esta logueado y asi poder mostrarla en el navbar por ejemplo o en el perfil del usuario logueado en el dashboard
  profile(token: string) {
    // Esta es otra forma de enviar el token en el header de la peticion pero no es la mas recomendada ya que no es muy escalable y no es muy facil de leer y entender el codigo asi que la otra forma es la que esta comentada abajo
    // this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // ahorita esto se agregar los header no se usa porque lo hace el interceptor
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //Esto tambien se puede enviar en los header pero por ahora no es necesario 'Content-Type': 'application/json'
      // }
    });
  }

  getProfile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this.http
      .get<User>(`${this.apiUrl}/profile`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // 'Content-type': 'application/json'
        // }
      })
      .pipe(
        // tap va es a ejecutar solo una accion que seria modificar esa data una vez recibido el perfil
        tap((user) => this.user.next(user))
      );
  }

  getRol() {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
