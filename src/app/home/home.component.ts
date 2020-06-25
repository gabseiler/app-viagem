import { Component, OnInit, TemplateRef } from '@angular/core';
import { VoosService } from '../_services/voos.service';
import { Voo, Companhia, Aeroporto } from '../_models/voo.model';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  modalRef: BsModalRef;

  vooSelecionado: Voo;
  qtd = 1;
  precoInicialVoo: string;

  constructor(private vooservice: VoosService, public datepipe: DatePipe, private modalService: BsModalService) { }

  ngOnInit() {
    const voo = {
      origem : 'SAOA-sky',
      destino : 'RIOA-sky',
      dataIda : '2020-06',
      dataVolta : 'anytime',
    };
    this.buscarVoos(voo);
    this.somenteIda = true;
  }

  async buscarVoos(voo: any) {
    this.vooservice.getVoo(voo.origem, voo.destino,
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
        this.voo.precoUnit = element.MinPrice;
        this.voo.precoTotal = element.MinPrice;
        this.voo.direto = element.Direct;
        this.voo.storageKey = 'item' + this.voo.id;
        this.voo.qtd = 1;
        this.voo.companhiaIda = this.companhias.find(companhia => companhia.CarrierId === element.OutboundLeg.CarrierIds[0]).Name;
        this.voo.origemIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.OriginId).Name;
        this.voo.origemSiglaIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.OriginId).IataCode;
        this.voo.destinoIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).Name;
        this.voo.destinoSiglaIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).IataCode;
        this.voo.dataIda = this.datepipe.transform(element.OutboundLeg.DepartureDate, 'dd/MM/yyyy HH:mm');
        if (!somenteIda) {
        this.voo.companhiaVolta = this.companhias.find(companhia => companhia.CarrierId === element.InboundLeg.CarrierIds[0]).Name;
        this.voo.origemVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.OriginId).Name;
        this.voo.origemSiglaVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.OriginId).IataCode;
        this.voo.destinoVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.DestinationId).Name;
        this.voo.destinoSiglaVolta = this.aeroportos.find(aero => aero.PlaceId === element.InboundLeg.DestinationId).IataCode;
        this.voo.dataVolta = this.datepipe.transform(element.InboundLeg.DepartureDate, 'dd/MM/yyyy HH:mm');
        this.voo.precoTotal = Number(this.voo.precoUnit) * 2 + '';
        this.voo.precoUnit = this.voo.precoTotal;
        }
        this.voos.push(this.voo);
    });
    console.log(this.voos);
  }

  openModal(template: TemplateRef<any>, voo: Voo) {
    this.vooSelecionado = voo;
    this.modalRef = this.modalService.show(template);
  }

  addCarrinho() {
    localStorage.setItem('item' + this.vooSelecionado.id, JSON.stringify(this.vooSelecionado));
    this.modalRef.hide();
  }
  mudarPreco() {
    this.vooSelecionado.qtd = this.qtd;
    this.vooSelecionado.precoTotal = (Number(this.vooSelecionado.precoUnit) * this.qtd) + '';
  }
}
