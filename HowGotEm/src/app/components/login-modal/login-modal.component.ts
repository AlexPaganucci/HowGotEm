import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", Validators.required);
  errorMessage!: string;

  constructor(private modalSrv: ModalService, private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : "";
  }

  openSignupModal(){
    this.modalSrv.openSignupModal();
  }

  async onSubmit(){
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (!emailValue || !passwordValue) {
      console.error('Errore: email o password non validi');
      return;
    }

    const login: LoginRequest = {
      email: emailValue,
      password: passwordValue
    };

    try {
      let response = await lastValueFrom(this.authSrv.login(login));
      this.email.reset();
      this.password.reset();
      this.modalSrv.closeModals();
      this.modalSrv.showNotification("Login effettuato con successo");
    }catch (error: any) {
      console.error('Errore nella chiamata HTTP', error);
      if (error.status === 401) {
        this.errorMessage = 'Username o password non validi. Riprova.';
      } else {
        this.errorMessage = 'Errore durante l\'accesso al sistema. Riprova più tardi.';
      }
    }
  }

}
