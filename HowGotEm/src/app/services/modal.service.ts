import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { LogoutConfirmModalComponent } from '../components/logout-confirm-modal/logout-confirm-modal.component';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { ErrorPaymentsModalComponent } from '../components/error-payments-modal/error-payments-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  openLogoutModal(): void {
    this.dialog.open(LogoutConfirmModalComponent,{
      panelClass: 'logout-dialog-container'
    });
  }

  openErrorPaymentModal(): void {
    this.dialog.open(ErrorPaymentsModalComponent, {
      panelClass: 'error-payments-container'
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
