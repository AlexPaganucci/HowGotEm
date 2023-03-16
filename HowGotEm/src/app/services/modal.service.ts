import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { SneakersModalComponent } from '../components/sneakers-modal/sneakers-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  closeModals() {
      this.dialog.closeAll();
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
      panelClass: ['custom-close-button'],
    });
  }

}
