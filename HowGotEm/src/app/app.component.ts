import { Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ModalService } from './services/modal.service';
import { AuthService, CONST_UTENTE } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HowGotEm';
  showFiller = false;
  isSmallScreen = false;
  showSearch = false;
  isLogged = false;
  searchTerm: string = "";

  constructor(private breakpointObserver: BreakpointObserver, private modalSrv: ModalService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.auth.auth$.subscribe(token => {
      if (token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
    if (this.auth.isLogged() && this.auth.checkTokenValidity()) {
      this.isLogged = true;
    }
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === CONST_UTENTE) {
      // Aggiorna la variabile isLogged in base alla presenza del valore nel Session Storage
      this.isLogged = sessionStorage.getItem(CONST_UTENTE) != null;
    }
  }

  openSneakersModal(){
    this.modalSrv.openSneakersModal();
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  openSignupModal(){
    this.modalSrv.openSignupModal();
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  openLogoutModal(){
    this.modalSrv.openLogoutModal();
  }

  filterSearch() {
    this.router.navigate(['/sneakers', this.searchTerm]);
  }

}


