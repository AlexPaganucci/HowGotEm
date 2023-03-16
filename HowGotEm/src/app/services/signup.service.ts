import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupRequest } from '../models/signup-request';
import { Token } from '../models/token';
import { CONST_UTENTE } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private authSubject = new BehaviorSubject<Token | null>(null);
  auth$ = this.authSubject.asObservable();
  jwtHelper = new JwtHelperService();
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public signup(signupReq: SignupRequest): Observable<Token> {
    return this.http.post<Token>(`http://${this.apiUrl}/auth/signup`, signupReq )
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
}
