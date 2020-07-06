import { Component, OnInit } from '@angular/core';
import { Voo } from '../_models/voo.model';
import { Hotel } from '../_models/hotel.model';
import { ReservaService } from '../_services/reserva.service';
import { element } from 'protractor';
import { AlertifyService } from '../_services/alertify.service';

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
  naoFinalizou = false;

  constructor(private reservaService: ReservaService, private alert: AlertifyService) { }

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
    let itensPacote = '';
    if (this.voos.length > 0) {
      itensPacote += 'Voo: ';
      this.voos.forEach(element => {
        itensPacote += element.cidadeDestino + ', Data: ' + element.dataIda + '; ';
      });
    }
    if (this.hoteis.length > 0) {
      itensPacote += 'Hotel: ';
      this.hoteis.forEach(element => {
        itensPacote += element.nome + '; ';
      });
    }

    const model = {
      user: localStorage.getItem('clienteId'),
      hotel: 1,
      voo: 1,
      cpf: localStorage.getItem('clienteCpf'),
      primeiro_nome: localStorage.getItem('clienteNome'),
      itens_pacote: itensPacote,
      preco_total: this.precoTotal,
      email: localStorage.getItem('clienteEmail')
    };

    this.naoFinalizou = true;

    for (let a in localStorage) {
      if (a.includes('item')) {
        localStorage.removeItem(a);
      }
    }
    localStorage.removeItem('precoTotal');
    this.reservaService.adicionarReserva(model).subscribe(data => {
      this.alert.success("Compra realizada com sucesso!");
    }, error => {
    });
  }

}
