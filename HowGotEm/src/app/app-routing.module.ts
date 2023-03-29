import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AdminFormComponent } from './components/page/admin-form/admin-form.component';
import { CarrelloComponent } from './components/page/carrello/carrello.component';
import { ChiSiamoComponent } from './components/page/chi-siamo/chi-siamo.component';
import { ContattiComponent } from './components/page/contatti/contatti.component';
import { HomeComponent } from './components/page/home/home.component';
import { ProfiloComponent } from './components/page/profilo/profilo.component';
import { ScarpaComponent } from './components/page/scarpa/scarpa.component';
import { SneakersComponent } from './components/page/sneakers/sneakers.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sneakers", component: SneakersComponent},
  {path: "sneakers/:filter", component: SneakersComponent},
  {path: "contatti", component: ContattiComponent},
  {path: "carrello", component: CarrelloComponent},
  {path: "profilo", component: ProfiloComponent, canActivate:[AuthGuard]},
  {path: "admin", component: AdminFormComponent, canActivate:[AdminGuard]},
  {path: "admin/:id", component: AdminFormComponent, canActivate:[AdminGuard]},
  {path: "chisiamo", component: ChiSiamoComponent},
  {path: "scarpa/:id", component: ScarpaComponent},
  {path:'**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
