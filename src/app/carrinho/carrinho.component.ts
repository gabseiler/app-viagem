import { Component, OnInit } from '@angular/core';
import { Voo } from '../_models/voo.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {


  voos: Voo[];
  hoteis: any[];
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
    // tslint:disable-next-line: forin
    for (let a in localStorage) {
      if (a.includes('item')) {
        const i = JSON.parse(localStorage.getItem(a));
        console.log(i);
        if (i != null && i['tipo'] === 1) {
          this.voos.push(i);
        }
      }
   }
  }

  mudarPreco() {
  }
  excluir(key: string) {
    localStorage.removeItem(key);
    this.ngOnInit();
  }

  calcularTotal() {
    if (this.voos.length === 0) {
      this.totalVoos = 0;
    } else {
      for (const voo of this.voos) {
        this.totalVoos += Number(voo.preco);
      }
    }

    this.total = this.totalVoos + this.totalHoteis;
  }

}
