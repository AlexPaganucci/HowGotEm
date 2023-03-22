import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = this.authService.getUser(); // Recupera i dati dell'utente dal sessionStorage

      if (user && user.roles.includes('ADMIN')) { // Controlla se l'utente ha il ruolo di amministratore
        return true; // Consente l'accesso alla rotta protetta
      } else {
        this.router.navigate(['/']); // Redirige l'utente a una pagina di accesso negato
        return false; // Negare l'accesso alla rotta protetta
      }
  }
}
