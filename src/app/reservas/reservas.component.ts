import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../_services/reserva.service';
import { Reserva } from '../_models/reserva.model';
import { UserService } from '../_services/User.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas: Reserva[];

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.getAllReservas();
  }

  getAllReservas() {
    this.reservaService.getReservasByCliente(localStorage.getItem('cliente'));
  }

}
