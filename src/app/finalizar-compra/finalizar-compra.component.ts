import { Component, OnInit } from '@angular/core';
import { Voo } from '../_models/voo.model';
import { Hotel } from '../_models/hotel.model';
import { ReservaService } from '../_services/reserva.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {

  voos: Voo[];
  qtdVoos: number;
  hoteis: Hotel[];
  qtdHotel: number;

  precoTotal: number;

  isBoleto = true;

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.getAllItems();
    this.precoTotal = Number(localStorage.getItem('precoTotal'));
  }

  getAllItems() {
    this.voos = new Array();
    this.hoteis = new Array();
    // tslint:disable-next-line: forin
    for (let a in localStorage) {
      if (a.includes('item')) {
        const i = JSON.parse(localStorage.getItem(a));
        if (i != null && i['tipo'] === 1) {
          this.voos.push(i);
        } else if (i != null && i['tipo'] === 2) {
          this.hoteis.push(i);
        }
      }
    }

    this.qtdVoos = this.voos.length;
    this.qtdHotel = this.hoteis.length;
  }

  onItemChange(boleto: boolean) {
    if (boleto) {
      this.isBoleto = true;
    } else {
      this.isBoleto = false;
    }
  }

  finalizar() {
    const model = {
      nomePacote : 'criar pacote',
      precoTotal : 'RIOA-sky',
      idCliente: localStorage.getItem('cliente')
    };
    this.reservaService.adicionarReserva(model).subscribe(data => {
    }, error => {
    });
  }

}
