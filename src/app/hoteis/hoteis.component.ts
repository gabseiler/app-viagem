import { Component, OnInit } from '@angular/core';
import { HoteisService } from '../_services/hoteis.service';
import { Local, Hotel } from '../_models/hotel.model';
import { element } from 'protractor';

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

  constructor(private hotelService: HoteisService) { }

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
      this.montarHoteis();
    });
  }

  montarHoteis() {
    this.hoteis = new Array();

    this.aux.forEach(element => {
      this.hotel = new Hotel();

      this.hotel.id = element.location_id;
      this.hotel.nome = element.name;
      this.hotel.nota = element.hotel_class;
      this.hotel.local = element.location_string;
      this.hotel.preco = element.hac_offers.offers[0].display_price_int;
      this.hotel.foto_url = element.photo.images.medium.url;
      this.hoteis.push(this.hotel);
    });
    console.log(this.hoteis);
  }

}
