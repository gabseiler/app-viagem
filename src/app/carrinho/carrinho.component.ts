import { Component, OnInit } from '@angular/core';
import { Voo } from '../_models/voo.model';
import { UserService } from '../_services/User.service';
import { Hotel } from '../_models/hotel.model';
import { MenuComponent } from '../menu/menu.component';
import { AlertifyService } from '../_services/alertify.service';

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

  constructor(private userService: UserService, private alert: AlertifyService) { }

  ngOnInit() {
    this.getAllItems();
    this.calcularTotal();
    this.getUser();
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
  getUser() {
    this.userService.getUser().subscribe(data => {
      //this.menu.ngOnInit();
    }, error => {
    });
  }

  finalizar() {
    localStorage.removeItem('precoTotal');
    localStorage.setItem('precoTotal', this.total + '');
  }

}
