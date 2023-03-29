import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/page/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { UnderNavbarComponent } from './components/under-navbar/under-navbar.component';
import { SneakersModalComponent } from './components/sneakers-modal/sneakers-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { SneakersComponent } from './components/page/sneakers/sneakers.component';
import { ContattiComponent } from './components/page/contatti/contatti.component';
import { CarrelloComponent } from './components/page/carrello/carrello.component';
import { ProfiloComponent } from './components/page/profilo/profilo.component';
import { AdminFormComponent } from './components/page/admin-form/admin-form.component';
import { ChiSiamoComponent } from './components/page/chi-siamo/chi-siamo.component';
import { ScarpaComponent } from './components/page/scarpa/scarpa.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { AuthTokenInterceptor } from './auth/auth-token.interceptor';
import { LogoutConfirmModalComponent } from './components/logout-confirm-modal/logout-confirm-modal.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { NgxPayPalModule } from 'ngx-paypal';
import { PayPalComponent } from './components/payments/pay-pal/pay-pal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    CardComponent,
    UnderNavbarComponent,
    SneakersModalComponent,
    LoginModalComponent,
    SignupModalComponent,
    SneakersComponent,
    ContattiComponent,
    CarrelloComponent,
    ProfiloComponent,
    AdminFormComponent,
    ChiSiamoComponent,
    ScarpaComponent,
    ErrorComponent,
    LogoutConfirmModalComponent,
    PayPalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxPayPalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
