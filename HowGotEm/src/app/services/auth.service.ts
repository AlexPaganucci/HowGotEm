import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request';
import { Token } from '../models/token';

export const CONST_UTENTE = 'User';
export const CONST_AUTH_TOKEN = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authSubject = new BehaviorSubject<Token | null>(null);
  auth$ = this.authSubject.asObservable();
  jwtHelper = new JwtHelperService();
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public login(logReq: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`http://${this.apiUrl}/auth/login`, logReq )
      .pipe(
        tap(data => {
          this.authSubject.next(data);
          sessionStorage.setItem(CONST_UTENTE, JSON.stringify(data));
        }),
        catchError(error => {
          console.error('Errore nella chiamata HTTP', error);
          return throwError(error);
        })
      );
  }

  loggedUser() {
    let utente = sessionStorage.getItem(CONST_UTENTE);
    return sessionStorage.getItem(CONST_UTENTE) != null ? utente : '';
  }

  getAuthToken() {
    if (this.loggedUser()) return sessionStorage.getItem(CONST_AUTH_TOKEN);
    else return '';
  }

  isLogged() {
    return sessionStorage.getItem(CONST_UTENTE) != null ? true : false;
  }

  clearAll() {
    sessionStorage.removeItem(CONST_UTENTE);
    sessionStorage.removeItem(CONST_AUTH_TOKEN);
  }
}
