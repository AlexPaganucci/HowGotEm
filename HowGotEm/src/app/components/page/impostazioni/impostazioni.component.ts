import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UpdateUserRequest } from 'src/app/models/update-user-request';
import { User } from 'src/app/models/user';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.css']
})
export class ImpostazioniComponent implements OnInit {

  user!: User;
  hidePassword = true;
  hideConfirmPassword = true;
  updateForm!: FormGroup;

  constructor(private userSrv: UserService, private fb: FormBuilder, private modalSrv: ModalService) {}

  ngOnInit(): void {
    this.getUser();
    // this.createForm();
  }

  getUser(){
    this.userSrv.getUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => console.error(error),
      complete: () => this.createForm(),
    });
  }

  getErrorMessage() {
    if (this.updateForm?.get('email')?.hasError('required')) {
      return 'You must enter an email';
    }

    return this.updateForm?.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  passwordsMatch(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: ['', Validators.required],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      postalCode: [this.user.postalCode, [Validators.required, Validators.maxLength(5)]],
      birthdate: [this.user.birthdate, [Validators.required]],
      speditionAddress: [this.user.speditionAddress],
      speditionCity: [this.user.speditionCity],
      speditionPostalCode: [this.user.speditionPostalCode, [Validators.maxLength(5)]]
    }, { validator: this.passwordsMatch });
  }

  async modifySignup() {
    const emailValue = this.updateForm.get('email')?.value;
    const nameValue = this.updateForm.get('name')?.value;
    const surnameValue = this.updateForm.get('surname')?.value;
    const passwordValue = this.updateForm.get('password')?.value;
    const confirmPasswordValue = this.updateForm.get('confirmPassword')?.value;
    const addressValue = this.updateForm.get('address')?.value;
    const cityValue = this.updateForm.get('city')?.value;
    const postalCodeValue = this.updateForm.get('postalCode')?.value;
    const birthdateValue = this.updateForm.get('birthdate')?.value;
    const speditionAddressValue = this.updateForm.get('speditionAddress')?.value;
    const speditionCityValue = this.updateForm.get('speditionCity')?.value;
    const speditionPostalCodeValue = this.updateForm.get('speditionPostalCode')?.value;


    if (!emailValue || !passwordValue || !confirmPasswordValue) {
      console.error('Errore: email o password non validi');
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      console.error('Errore: la password e la conferma della password non corrispondono');
      return;
    }

    const updateUser: UpdateUserRequest = {
      email: emailValue,
      name: nameValue,
      surname: surnameValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      address: addressValue,
      city: cityValue,
      postalCode: postalCodeValue,
      birthdate: birthdateValue,
      speditionAddress: speditionAddressValue,
      speditionCity: speditionCityValue,
      speditionPostalCode: speditionPostalCodeValue,
    };

    try {
      let response = await lastValueFrom(this.userSrv.updateUserById(this.user.id, updateUser));
      this.updateForm.reset();
      this.modalSrv.showNotification("Profilo aggiornato");
    } catch (error) {
      console.error('Errore nella chiamata HTTP', error);
    }
  }
}
