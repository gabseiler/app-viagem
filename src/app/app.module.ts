import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from '@angular/forms';


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
      HttpClientModule,
      Ng2CompleterModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
