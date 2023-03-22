import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, defer, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { LoginRequest } from '../models/login-request';
import { SignupRequest } from '../models/signup-request';
import { Token } from '../models/token';

export const CONST_UTENTE = 'User';
export const CONST_CART = 'cart';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authSubject = new BehaviorSubject<Token | null>(null);
  auth$ = this.authSubject.asObservable();
  jwtHelper = new JwtHelperService();
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const user = this.getUser();
    if (user && user.token) {
    this.authSubject.next(user.token);
    }else {
      this.authSubject.next(null); // Imposta il valore iniziale del subject a null se il token non è presente nella session storage
    }
  }

  public login(logReq: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, logReq )
      .pipe(
        tap(data => {
          this.authSubject.next(data);
          sessionStorage.setItem(CONST_UTENTE, JSON.stringify(data));
          this.setCart();
          console.log(data);
        }),
        catchError(error => {
          console.error('Errore nella chiamata HTTP', error);
          return throwError(error);
        })
      );
  }

  public signup(signupReq: SignupRequest): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/auth/signup`, signupReq )
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

  private setCart(): void {
    const userStr = sessionStorage.getItem(CONST_UTENTE);
    const user = userStr ? JSON.parse(userStr) : null;
    const cart: Cart = {
      userId: user ? user.id : '',
      shoes: [],
      totalPrice: 0
    };
    sessionStorage.setItem(CONST_CART, JSON.stringify(cart));
  }

  loggedUser() {
    let utente = sessionStorage.getItem(CONST_UTENTE);
    return sessionStorage.getItem(CONST_UTENTE) != null ? utente : '';
  }

  getUser(){
    let utente = sessionStorage.getItem(CONST_UTENTE);
    if(utente){
      return  JSON.parse(utente);
    } else null;
  }

  isLogged() {
    return sessionStorage.getItem(CONST_UTENTE) != null ? true : false;
  }

  clearAll() {
    sessionStorage.removeItem(CONST_UTENTE);
  }

  public logout() {
    this.authSubject.next(null);
    this.clearAll();
  }

  public checkTokenValidity(): boolean {
    const user = this.getUser();;

    if (!user || !user.token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(user.token);
    if (isExpired) {
      this.clearAll();
      return false;
    }
    return true;
  }
}
