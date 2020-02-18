import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonPipe } from './pipes/pokemon.pipe';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';
import { LoginComponent } from './paginas/login/login.component';
import { MensajeComponent } from './componentes/mensaje/mensaje.component'; //para llamadas por http

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    PokemonPipe,
    BackofficeComponent,
    LoginComponent,
    MensajeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //módulo para llamadas por http
    FormsModule, //módulo para usar formularios
    ReactiveFormsModule, //módulo para usar formularios reactivos
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
