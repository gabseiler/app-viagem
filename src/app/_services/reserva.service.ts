import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  baseUrl = 'https://api-app-viagem.herokuapp.com/reserva/';


  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get(this.baseUrl, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }
  getReservasByCliente(id: string) {
    return this.http.get(this.baseUrl, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }
  adicionarReserva(model: any) {
    return this.http.post(this.baseUrl, model, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }

}

