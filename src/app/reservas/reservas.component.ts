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

  aux: any;
  reservas: any;

  gofar = true;

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.getAllReservas();
    //this.getAllReservasSmart();
  }

  getAllReservas() {
    this.reservas = new Array();
    this.reservaService.getReservas()
      .subscribe(data => {
        this.aux = data;
        this.aux.forEach(element => {
          if (element.user === Number(localStorage.getItem('clienteId'))) {
            this.reservas.push(element);
          }
        });
      });
  }
  getAllReservasSmart() {
    this.reservaService.getReservasByClienteSmart(localStorage.getItem('clienteCpf'))
      .subscribe(data => {
        this.reservas = data;
      });
  }

  changeReserva(isGoFar: boolean) {
    this.gofar = isGoFar;
  }

}
