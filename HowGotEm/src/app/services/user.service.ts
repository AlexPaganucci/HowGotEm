import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateUserRequest } from '../models/update-user-request';
import { User } from '../models/user';
import { CONST_UTENTE } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    const token = sessionStorage.getItem(CONST_UTENTE);
    const userId = token ? JSON.parse(token).id : null;
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  updateUserById(id: number, updateUserRequest: UpdateUserRequest): Observable<any> {
    const url = `${this.apiUrl}/user/${id}`;
    return this.http.put(url, updateUserRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`)
      .pipe(
        catchError(error => {
          // Gestione dell'errore
          console.error(error);
          throw error;
        })
      );
  }
}
