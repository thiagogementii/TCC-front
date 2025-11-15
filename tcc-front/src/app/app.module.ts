import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './component/cabecalho/cabecalho.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { ChatbotComponent } from './component/chatbot/chatbot.component';
import { MarcaCarrosComponent } from './pages/marca-carros/marca-carros.component';
import { HeroCarouselComponent } from './component/hero-carousel/hero-carousel.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { BrandsCarouselComponent } from './component/brands-carousel/brands-carousel.component';
import { BuscaResultadosComponent } from './pages/busca-resultados/busca-resultados.component';
import { DetalhesCarroComponent } from './pages/detalhes-carro/detalhes-carro.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PaginaCabecalhoComponent } from './component/pagina-cabecalho/pagina-cabecalho.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LandingPageComponent,
    ChatbotComponent,
    MarcaCarrosComponent,
    HeroCarouselComponent,
    SearchBarComponent,
    BrandsCarouselComponent,
    BuscaResultadosComponent,
    DetalhesCarroComponent,
    PageHeaderComponent,
    PaginaCabecalhoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
