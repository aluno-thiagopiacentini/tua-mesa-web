import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Atendente } from './atendente/atendente.component';
import { AtendenteIncluir } from './incluirFilas/atendente-incluir.component';
import { Filas } from './filas/filas.component';
import { FilasAcoesEspera } from './filasAcoesEspera/filas-acoes-espera.component';


@NgModule({
  declarations: [
    AppComponent,
    Atendente,
    AtendenteIncluir,
    Filas,
    FilasAcoesEspera
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Atendente,AtendenteIncluir,Filas,FilasAcoesEspera],
  bootstrap: [AppComponent]
})
export class AppModule { }
