import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrelloComponent } from './components/page/carrello/carrello.component';
import { ChiSiamoComponent } from './components/page/chi-siamo/chi-siamo.component';
import { ContattiComponent } from './components/page/contatti/contatti.component';
import { HomeComponent } from './components/page/home/home.component';
import { ProfiloComponent } from './components/page/profilo/profilo.component';
import { ScarpaComponent } from './components/page/scarpa/scarpa.component';
import { SneakersComponent } from './components/page/sneakers/sneakers.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sneakers", component: SneakersComponent},
  {path: "sneakers/:brand", component: SneakersComponent},
  {path: "contatti", component: ContattiComponent},
  {path: "carrello", component: CarrelloComponent},
  {path: "profilo", component: ProfiloComponent},
  {path: "chisiamo", component: ChiSiamoComponent},
  {path: "scarpa", component: ScarpaComponent}
  // {path: "scarpa/:id", component: ScarpaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
