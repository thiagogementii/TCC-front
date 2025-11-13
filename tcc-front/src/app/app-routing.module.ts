import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { MarcaCarrosComponent } from './pages/marca-carros/marca-carros.component';
import { BuscaResultadosComponent } from './pages/busca-resultados/busca-resultados.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: LandingPageComponent },
  { path: 'marca/:slug', component: MarcaCarrosComponent },
  { path: 'busca', component: BuscaResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
