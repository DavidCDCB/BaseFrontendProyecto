import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { HijoComponent } from './prueba/hijo/hijo.component';

import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    HijoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
