import { Component, OnInit, TemplateRef } from '@angular/core';
import { VoosService } from '../_services/voos.service';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HoteisService } from '../_services/hoteis.service';
import { Hotel } from '../_models/hotel.model';
import { Aeroporto, Companhia, Voo } from '../_models/voo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotel: Hotel;
  hoteis: Hotel[];
  hotelSelecionado: Hotel;
  voo: Voo;
  voos: Voo[];
  vooSelecionado: Voo;
  aeroportoOrigem: Aeroporto;
  aeroportoDestino: Aeroporto;
  aeroportos: Aeroporto[];
  companhias: Companhia[];
  quotes: any[];
  modalRef: BsModalRef;
  aux: any;
  dataCheckout: any;
  adultos: number;

  constructor(private hotelService: HoteisService, private vooservice: VoosService,
    public datepipe: DatePipe, private modalService: BsModalService) { }

  ngOnInit() {
    const a = {
      cidadeIdDestino: '303293',
      cidadeDestino: 'Fortaleza',
      siglaDestino: 'FOR-sky',
      cidadeOrigem: 'São Paulo',
      siglaOrigem: 'SAOA-sky',
      dataCheckin: '2020-10-24',
      adultos: '2',
      quartos: '1',
      noites: '7'
    };
    this.buscar(a);

  }
  async buscar(infos: any) {
    console.log(infos);
    // hoteis
    await this.hotelService.getHoteis(infos.cidadeIdDestino, infos.dataCheckin,
      infos.adultos, infos.noites, infos.quartos).subscribe(data => {
        this.aux = data['data'];
        this.montarHoteis(infos.cidadeIdDestino, infos.dataCheckin, infos.adultos, infos.noites, infos.quartos);
      });
    this.dataCheckout = new Date(infos.dataCheckin);
    this.dataCheckout = this.datepipe.transform(
      this.dataCheckout.setDate(this.dataCheckout.getDate() + (Number(infos.noites) + 1)), 'yyyy-MM-dd');
    this.adultos = infos.adultos;
    // voos
    await this.vooservice.getVoo(infos.siglaOrigem, infos.siglaDestino,
      '2020-10', '').subscribe(dados => {
        this.quotes = dados['Quotes'];
        this.companhias = dados['Carriers'];
        this.aeroportos = dados['Places'];
        console.log(dados);
        this.montarVoos();
      });
  }

  montarHoteis(id: any, checkin: any, adults: any, nights: any, rooms: any) {
    this.hoteis = new Array();
    if (this.aux) {
      this.aux.forEach(element => {
        this.hotel = new Hotel();

        this.hotel.id = element.location_id;
        this.hotel.nome = element.name;
        this.hotel.nota = element.hotel_class;
        this.hotel.local = element.location_string;
        this.hotel.preco = Number(element.hac_offers.offers[0].display_price_int);
        if (!this.hotel.preco) {
          if (this.hotel.nota === '1') {
            this.hotel.preco = 50;
          } else if (this.hotel.nota === '2') {
            this.hotel.preco = 125;
          } else if (this.hotel.nota === '3') {
            this.hotel.preco = 200;
          } else if (this.hotel.nota === '4') {
            this.hotel.preco = 350;
          } else if (this.hotel.nota === '5') {
            this.hotel.preco = 760;
          }
        }
        this.hotel.fotoUrl = element.photo.images.medium.url;
        this.hotel.checkIn = this.datepipe.transform(checkin, 'dd/MM/yyyy');
        this.hotel.adultos = adults;
        this.hotel.noites = nights;
        this.hotel.quartos = rooms;
        this.hotel.storageKey = 'item' + this.hotel.id;
        this.hoteis.push(this.hotel);
      });
    }
  }

  montarVoos() {
    this.voos = new Array();

    this.quotes.forEach(element => {
      this.voo = new Voo();
      this.voo.id = element.QuoteId;
      this.voo.precoUnit = element.MinPrice;
      this.voo.precoTotal = element.MinPrice;
      this.voo.direto = element.Direct;
      this.voo.storageKey = 'item' + this.voo.id;
      this.voo.qtd = this.adultos;
      this.voo.companhiaIda = this.companhias.find(companhia => companhia.CarrierId === element.OutboundLeg.CarrierIds[0]).Name;
      this.voo.origemIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.OriginId).Name;
      this.voo.origemSiglaIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.OriginId).IataCode;
      this.voo.destinoIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).Name;
      this.voo.cidadeDestino = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).CityName;
      this.voo.paisDestino = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).CountryName;
      this.voo.destinoSiglaIda = this.aeroportos.find(aero => aero.PlaceId === element.OutboundLeg.DestinationId).IataCode;

      this.voo.dataIda = this.datepipe.transform(element.OutboundLeg.DepartureDate, 'dd/MM/yyyy HH:mm');
      // volta
      this.voo.companhiaVolta = this.voo.companhiaIda;
      this.voo.origemVolta = this.voo.destinoIda;
      this.voo.origemSiglaVolta = this.voo.destinoSiglaIda;
      this.voo.destinoVolta = this.voo.origemIda;
      this.voo.destinoSiglaVolta = this.voo.origemSiglaIda;
      this.voo.dataVolta = this.datepipe.transform(this.dataCheckout, 'dd/MM/yyyy HH:mm');
      this.voo.precoTotal = Number(this.voo.precoUnit) * 2;
      this.voo.precoUnit = this.voo.precoTotal;

      this.voos.push(this.voo);
    });
  }

  addCarrinho() {
    localStorage.setItem('item' + this.vooSelecionado.id, JSON.stringify(this.vooSelecionado));
    localStorage.setItem('item' + this.hotelSelecionado.id, JSON.stringify(this.hotelSelecionado));
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, voo: Voo, hotel: Hotel) {
    this.vooSelecionado = voo;
    this.hotelSelecionado = hotel;
    this.modalRef = this.modalService.show(template);
  }

}
