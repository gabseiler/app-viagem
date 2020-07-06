import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
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
import { RodapeComponent } from './rodape/rodape.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LoginComponent } from './login/login.component';
import { HoteisComponent } from './hoteis/hoteis.component';
import { BuscaHoteisComponent } from './busca-hoteis/busca.hoteis.component';
import { ReservasComponent } from './reservas/reservas.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { VoosComponent } from './voos/voos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';



@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      BuscaComponent,
      HomeComponent,
      RodapeComponent,
      CarrinhoComponent,
      LoginComponent,
      HoteisComponent,
      BuscaHoteisComponent,
      ReservasComponent,
      FinalizarCompraComponent,
      VoosComponent,
      RegistrarComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      AutoCompleteModule,
      CalendarModule,
      ButtonModule,
      DataViewModule,
      ModalModule.forRoot(),
      BsDropdownModule.forRoot()
   ],
   providers: [
      DatePipe,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
