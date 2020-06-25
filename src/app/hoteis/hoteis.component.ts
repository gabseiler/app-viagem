import { Component, OnInit, TemplateRef } from '@angular/core';
import { HoteisService } from '../_services/hoteis.service';
import { Local, Hotel } from '../_models/hotel.model';
import { element } from 'protractor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hoteis',
  templateUrl: './hoteis.component.html',
  styleUrls: ['./hoteis.component.css']
})
export class HoteisComponent implements OnInit {
  hotel: Hotel;
  hoteis: Hotel[];
  locais: Local[];
  localAux: Local;
  aux: any[];

  model: any;
  modalRef: BsModalRef;
  hotelSelecionado: Hotel;

  constructor(private hotelService: HoteisService, public datepipe: DatePipe, private modalService: BsModalService) { }

  ngOnInit() {
    const a = {
      cidadeId: '303631',
      dataCheckin: '2021-02-06',
      adultos: '1',
      quartos: '1',
      noites: '1'
    };
    this.buscarHoteis(a);
  }

   buscarHoteis(hoteis: any) {
    console.log(hoteis);
    this.hotelService.getHoteis(hoteis.cidadeId, hoteis.dataCheckin, hoteis.adultos, hoteis.noites, hoteis.quartos).subscribe(data => {
      console.log(data['data']);
      this.aux  = data['data'];
      this.montarHoteis(hoteis.cidadeId, hoteis.dataCheckin, hoteis.adultos, hoteis.noites, hoteis.quartos);
    });
  }

  montarHoteis(id: any, checkin: any, adults: any, nights: any, rooms: any) {
    this.hoteis = new Array();

    this.aux.forEach(element => {
      this.hotel = new Hotel();

      this.hotel.id = element.location_id;
      this.hotel.nome = element.name;
      this.hotel.nota = element.hotel_class;
      this.hotel.local = element.location_string;
      this.hotel.preco = element.hac_offers.offers[0].display_price_int;
      if (!this.hotel.preco) {
        this.hotel.preco = '0';
      }
      this.hotel.fotoUrl = element.photo.images.medium.url;
      this.hotel.checkIn = this.datepipe.transform(checkin, 'dd/MM/yyyy');
      this.hotel.adultos = adults;
      this.hotel.noites = nights;
      this.hotel.quartos = rooms;
      this.hotel.storageKey = 'item' + this.hotel.id;
      this.hoteis.push(this.hotel);
    });
    console.log(this.hoteis);
  }

  addCarrinho() {
    localStorage.setItem('item' + this.hotelSelecionado.id, JSON.stringify(this.hotelSelecionado));
    this.modalRef.hide();
  }


  openModal(template: TemplateRef<any>, hotel: Hotel) {
    this.hotelSelecionado = hotel;
    this.modalRef = this.modalService.show(template);
  }

}
