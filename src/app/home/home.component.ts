import { Component, OnInit } from '@angular/core';
import { VoosService } from '../_services/voos.service';
import { Voo, Companhia, Aeroporto } from '../_models/voo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  voo: Voo;
  voos: Voo[];
  aeroportos: Aeroporto[];
  companhias: Companhia[];
  quotes: any[];
  somenteIda: boolean;

  constructor(private vooservice: VoosService) { }

  ngOnInit() {
    this.pegarvoos();
  }

  async pegarvoos() {
    //await this.vooservice.getAirport('Rio de Janeiro').subscribe(dados => {
    //  this.voos = dados['Places'];
    //});
  }

  async buscarVoos(voo: any) {
    console.log(voo);
    await this.vooservice.getVoo(voo.origem, voo.destino,
                                voo.dataIda, voo.dataVolta).subscribe(dados => {
      this.quotes = dados['Quotes'];
      this.companhias = dados['Carriers'];
      this.aeroportos = dados['Places'];
      if (voo.dataVolta === 'anytime') {
        this.somenteIda = true;
      } else {
        this.somenteIda = false;
      }
      this.montarVoos(this.somenteIda);
    });
  }

  montarVoos(somenteIda: any) {
    this.voos = new Array();
    console.log(this.quotes);


    this.quotes.forEach(element => {
        this.voo = new Voo();
        this.voo.id = element.QuoteId;
        this.voo.preco = element.MinPrice;
        this.voo.direto = element.Direct;
        this.voo.companhiaIda = this.companhias.find(companhia => companhia.CarrierId === element.OutboundLeg.CarrierIds[0]).Name;
        this.voo.origemIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.OriginId).Name;
        this.voo.destinoIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).Name;
        this.voo.dataIda = element.OutboundLeg.DepartureDate;
        if (!somenteIda) {
        this.voo.companhiaVolta = this.companhias.find(companhia => companhia.CarrierId === element.InboundLeg.CarrierIds[0]).Name;
        this.voo.origemVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.OriginId).Name;
        this.voo.destinoVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.DestinationId).Name;
        this.voo.dataVolta = element.InboundLeg.DepartureDate;
        }
        this.voos.push(this.voo);
    });


    console.log(this.voos);
  }

}
