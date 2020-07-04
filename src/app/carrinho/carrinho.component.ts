import { Component, OnInit } from '@angular/core';
import { Voo } from '../_models/voo.model';
import { Hotel } from '../_models/hotel.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {


  voos: Voo[];
  hoteis: Hotel[];
  qtd = 1;
  totalVoos = 0;
  totalHoteis = 0;
  total = 0;

  constructor() { }

  ngOnInit() {
    this.getAllItems();
    this.calcularTotal();
  }

  getAllItems() {
    this.voos = new Array();
    this.hoteis = new Array();
    // tslint:disable-next-line: forin
    for (let a in localStorage) {
      if (a.includes('item')) {
        const i = JSON.parse(localStorage.getItem(a));
        console.log(i);
        if (i != null && i['tipo'] === 1) {
          this.voos.push(i);
        } else if (i != null && i['tipo'] === 2) {
          console.log('oi');
          this.hoteis.push(i);
        }
      }
   }
   console.log(this.hoteis);
  }

  mudarPreco(i: number, qtd: number) {
    this.voos[i].precoTotal = Number(this.voos[i].precoUnit) * qtd ;
    this.calcularTotal();
  }
  excluir(key: string) {
    localStorage.removeItem(key);
    this.ngOnInit();
  }

  calcularTotal() {
    this.totalVoos = 0;
    this.totalHoteis = 0;

    if (this.voos.length === 0) {
      this.totalVoos = 0;
    } else if (this.voos.length !== 0) {
      for (const voo of this.voos) {
        this.totalVoos += Number(voo.precoTotal);
      }
    }

    if (this.hoteis.length === 0) {
      this.totalHoteis = 0;
    } else if (this.hoteis.length !== 0) {
      for (const hot of this.hoteis) {
        this.totalHoteis += Number(hot.preco);
      }
    }

    this.total = this.totalVoos + this.totalHoteis;
  }

}
