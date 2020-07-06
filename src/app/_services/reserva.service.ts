import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  baseUrl = 'https://api-app-viagem.herokuapp.com/reserva/';
  smartBaseUrl = 'https://ep-dsid.herokuapp.com/usuarios/cpf/';


  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get(this.baseUrl, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }
  getReservasByCliente(id: string) {
    return this.http.get(this.baseUrl+'id/'+id, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }
  adicionarReserva(model: any) {
    return this.http.post(this.baseUrl, model, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   });

  }
  getReservasByClienteSmart(cpf: string) {
    return this.http.get(this.smartBaseUrl + cpf + '/reservas');
  }

}

