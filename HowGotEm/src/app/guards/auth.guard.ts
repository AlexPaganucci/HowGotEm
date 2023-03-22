import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {

    if (!this.auth.isLogged()) {
      this.route.navigate(['/']);
      return false;
    } else if (this.auth.checkTokenValidity()) {
      return true;
    } else {
      this.auth.clearAll();
      this.route.navigate(['/']);
      return false;
    }
  }
}
