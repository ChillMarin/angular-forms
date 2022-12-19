import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders();

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient) {  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password });
  }

  // recibimos el token de cuando el usuario se loguea y lo enviamos en el header de la peticion para que el servidor sepa que usuario esta haciendo la peticion y asi poder devolvernos la informacion del usuario que esta logueado y asi poder mostrarla en el navbar por ejemplo o en el perfil del usuario logueado en el dashboard
  profile(token:string) {
    // Esta es otra forma de enviar el token en el header de la peticion pero no es la mas recomendada ya que no es muy escalable y no es muy facil de leer y entender el codigo asi que la otra forma es la que esta comentada abajo
    // this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //Esto tambien se puede enviar en los header pero por ahora no es necesario 'Content-Type': 'application/json'
      }
    });
  }

}
