import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Local } from '../_models/hotel.model';
import { HoteisService } from '../_services/hoteis.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-busca-hoteis',
  templateUrl: './busca.hoteis.component.html',
  styleUrls: ['./busca.hoteis.component.css']
})
export class BuscaHoteisComponent implements OnInit {

  @Output() respostaBusca = new EventEmitter();
  locais: Local[];
  localAux: Local;
  aux: any[];
  model: any = {};
  cidadeId: string;
  dataAux: any;

  constructor(private hotelService: HoteisService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.model.adultos = 1;
    this.model.noites = 1;
    this.model.quartos = 1;
  }

  async buscarCidade(event: any) {
    this.hotelService.getLocationsBuscar(event.query).subscribe(locations => {
        this.locais = new Array();
        this.aux = locations['data'];
        if (this.aux.length > 0) {
          this.aux.forEach(element => {
            if (element.result_type.trim() === 'geos') {
              this.localAux = new Local();
              this.localAux.id = element.result_object.location_id;
              this.localAux.nome = element.result_object.name;
              this.locais.push(this.localAux);
            }
          });
        }
    });
  }
  public onSelected(value: any) {
      this.cidadeId = value.id;
      this.model.cidade = value.nome;
  }

  buscar() {
    this.dataAux = new Date (Date.parse(this.model.dataCheckin));
    this.dataAux = this.datepipe.transform(this.dataAux, 'yyyy-MM-dd');

    this.respostaBusca.emit(
      {
        cidadeId: this.cidadeId,
        dataCheckin: this.dataAux,
        noites: this.model.noites,
        adultos: this.model.adultos,
        quartos: this.model.quartos
      }
    );
  }

}
