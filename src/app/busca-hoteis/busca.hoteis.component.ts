import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Local } from '../_models/hotel.model';
import { HoteisService } from '../_services/hoteis.service';
import { DatePipe } from '@angular/common';
import { VoosService } from '../_services/voos.service';

@Component({
  selector: 'app-busca-hoteis',
  templateUrl: './busca.hoteis.component.html',
  styleUrls: ['./busca.hoteis.component.css']
})
export class BuscaHoteisComponent implements OnInit {
  @Input() sePacotes;
  @Output() respostaBusca = new EventEmitter();
  locais: Local[];
  localAux: Local;
  aux: any[];
  model: any = {};
  cidadeId: string;
  cidadeDestino: string;
  siglaDestino: string;
  cidadeOrigem: string;
  siglaOrigem: string;
  dataAux: any;

  constructor(private hotelService: HoteisService, public datepipe: DatePipe, public vooService: VoosService) { }

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
  public onSelected(value: Local, seDestino: boolean) {
    if (seDestino) {
      this.cidadeId = value.id;
      this.model.cidadeDestino = `${value.nome}`;
      this.cidadeDestino = `${value.nome}`;
      this.getSiglaAeroporto(this.cidadeDestino, seDestino);
    } else {
      this.model.cidadeOrigem = `${value.nome}`;
      this.cidadeOrigem = `${value.nome}`;
      this.getSiglaAeroporto(this.cidadeOrigem, seDestino);
    }
  }

  getSiglaAeroporto(city: string, seDestino: boolean) {
    this.vooService.getAirport(city).subscribe(dados => {
        // tslint:disable-next-line: no-string-literal
        if (seDestino) {
          this.siglaDestino = dados['Places'][0].PlaceId;
        } else {
          this.siglaOrigem = dados['Places'][0].PlaceId;
        }
    });
  }

  buscar() {
    this.dataAux = new Date (Date.parse(this.model.dataCheckin));
    this.dataAux = this.datepipe.transform(this.dataAux, 'yyyy-MM-dd');
    if (!this.sePacotes) {
      this.model.cidadeOrigem = '';
    }

    this.respostaBusca.emit(
      {
        cidadeIdDestino: this.cidadeId,
        cidadeDestino: this.cidadeDestino,
        siglaDestino: this.siglaDestino,
        cidadeOrigem: this.cidadeOrigem,
        siglaOrigem: this.siglaOrigem,
        dataCheckin: this.dataAux,
        noites: this.model.noites,
        adultos: this.model.adultos,
        quartos: this.model.quartos
      }
    );
  }

}
