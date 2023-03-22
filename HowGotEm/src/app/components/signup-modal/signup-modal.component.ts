import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SignupRequest } from 'src/app/models/signup-request';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  hidePassword = true;
  hideConfirmPassword = true;
  signupForm!: FormGroup;

  constructor(private authSrv: AuthService, private modalSrv: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  openLoginModal(){
    this.modalSrv.openLoginModal();
  }

  getErrorMessage() {
    if (this.signupForm.get('email')!.hasError('required')) {
      return 'You must enter an email';
    }

    return this.signupForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  passwordsMatch(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      birthdate: ['', [Validators.required]],
    }, { validator: this.passwordsMatch });
  }

  async onSubmitSignup() {
    const emailValue = this.signupForm.get('email')?.value;
    const nameValue = this.signupForm.get('name')?.value;
    const surnameValue = this.signupForm.get('surname')?.value;
    const passwordValue = this.signupForm.get('password')?.value;
    const confirmPasswordValue = this.signupForm.get('confirmPassword')?.value;
    const addressValue = this.signupForm.get('address')?.value;
    const cityValue = this.signupForm.get('city')?.value;
    const postalCodeValue = this.signupForm.get('postalCode')?.value;
    const birthdateValue = this.signupForm.get('birthdate')?.value;

    if (!emailValue || !passwordValue || !confirmPasswordValue) {
      console.error('Errore: email o password non validi');
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      console.error('Errore: la password e la conferma della password non corrispondono');
      return;
    }

    const signup: SignupRequest = {
      email: emailValue,
      name: nameValue,
      surname: surnameValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      address: addressValue,
      city: cityValue,
      postalCode: postalCodeValue,
      birthdate: birthdateValue
    };

    try {
      let response = await lastValueFrom(this.authSrv.signup(signup));
      this.signupForm.reset();
      this.modalSrv.closeModals();
      this.modalSrv.showNotification("Registrazione effettuata con successo");
    } catch (error) {
      console.error('Errore nella chiamata HTTP', error);
    }
  }
}
