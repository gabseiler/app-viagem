import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { VoosService } from '../_services/voos.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  @Output() respostaVoos = new EventEmitter();
  model: any = {};
  origem: any;
  recebeVoos: any = {};
  somenteIda = false;
  auxOrigem: string;
  auxDestino: string;
  dataIdaAux: any;
  dataVoltaAux: any;

  constructor(private vooservice: VoosService) {
   }

  ngOnInit() {
    this.pegarvoos('al');
  }

  public async buscarAero(event: any) {
      await this.pegarvoos(event.query);
  }

  public onSelected(value: any, origem: boolean) {
    // Quando selecionado o estado, buscamos o Id, true = origem, false = destino -- para saber o campo
    if (origem) {
      this.auxOrigem = value.PlaceId;
      this.model.origem = `${value.PlaceName}- (${value.PlaceId})`;
    }  else if (!origem) {
      this.auxDestino = value.PlaceId;
      this.model.destino = `${value.PlaceName}- (${value.PlaceId})`;
    }
  }

  async pegarvoos(aeroporto: string) {
    await this.vooservice.getAirport(aeroporto).subscribe(dados => {
      this.recebeVoos = dados['Places'];
    });
  }

  buscar() {
    if (this.somenteIda) {
      this.dataVoltaAux = 'anytime';
      this.auxDestino = '';
    } else {
      this.dataVoltaAux = new Date (Date.parse(this.model.dataVolta));
      this.dataVoltaAux = this.dataVoltaAux.toLocaleDateString('en-US');
    }

    this.dataIdaAux = new Date (Date.parse(this.model.dataIda));
    this.dataIdaAux = this.dataIdaAux.toLocaleDateString('en-US');

    this.respostaVoos.emit(
      {
        origem: this.auxOrigem,
        destino: this.auxDestino,
        dataIda: this.dataIdaAux,
        dataVolta: this.dataVoltaAux
      }
    );
    console.log(this.respostaVoos);
  }
}
