import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';


import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BuscaComponent } from './busca/busca.component';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';



@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      BuscaComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      AutoCompleteModule,
      CalendarModule,
      ButtonModule,
      DataViewModule
   ],
   providers: [DatePipe],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
