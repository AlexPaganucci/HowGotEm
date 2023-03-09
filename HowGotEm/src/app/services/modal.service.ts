import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { SneakersModalComponent } from '../components/sneakers-modal/sneakers-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openSneakersModal(): void {
    this.dialog.open(SneakersModalComponent,  {
      panelClass: 'sneakers-dialog-container'
    });
  }

  openLoginModal(): void {
    this.dialog.open(LoginModalComponent,  {
      panelClass: 'login-dialog-container'
    });
  }

  openSignupModal(): void {
    this.dialog.open(SignupModalComponent,  {
      panelClass: 'signup-dialog-container'
    });
  }
}
