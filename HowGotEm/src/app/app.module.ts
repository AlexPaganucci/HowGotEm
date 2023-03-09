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
import { CardsComponent } from './components/cards/cards.component';
import { UnderNavbarComponent } from './components/under-navbar/under-navbar.component';
import { SneakersModalComponent } from './components/sneakers-modal/sneakers-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { SneakersComponent } from './components/page/sneakers/sneakers.component';
import { ContattiComponent } from './components/page/contatti/contatti.component';
import { CarrelloComponent } from './components/page/carrello/carrello.component';
import { ProfiloComponent } from './components/page/profilo/profilo.component';
import { AdminFormComponent } from './components/page/admin-form/admin-form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ChiSiamoComponent } from './components/page/chi-siamo/chi-siamo.component';
import { ScarpaComponent } from './components/page/scarpa/scarpa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    CardComponent,
    CardsComponent,
    UnderNavbarComponent,
    SneakersModalComponent,
    LoginModalComponent,
    SignupModalComponent,
    SneakersComponent,
    ContattiComponent,
    CarrelloComponent,
    ProfiloComponent,
    AdminFormComponent,
    PaginatorComponent,
    ChiSiamoComponent,
    ScarpaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
