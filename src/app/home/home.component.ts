import { Component, OnInit } from '@angular/core';
import { VoosService } from '../_services/voos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  voos: any;

  constructor(private vooservice: VoosService) { }

  ngOnInit() {
    this.pegarvoos();
  }

  async pegarvoos() {
    await this.vooservice.getAirport('Rio de Janeiro').subscribe(dados => {
      this.voos = dados['Places'];
    });
  }

  buscarVoos(voo: any) {
    console.log(voo);
  }

}
