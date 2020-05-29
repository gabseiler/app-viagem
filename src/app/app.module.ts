import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BuscaComponent } from './busca/busca.component';
import { HomeComponent } from './home/home.component';



@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      BuscaComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule, 
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
