import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './component/cabecalho/cabecalho.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LandingPageComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
