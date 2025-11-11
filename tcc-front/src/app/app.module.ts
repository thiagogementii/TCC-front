import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './component/cabecalho/cabecalho.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { ChatbotComponent } from './component/chatbot/chatbot.component';
import { MarcaCarrosComponent } from './pages/marca-carros/marca-carros.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LandingPageComponent,
    ChatbotComponent,
    MarcaCarrosComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
