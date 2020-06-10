import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { VoosService } from '../_services/voos.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  @Input() recebeVoos2;
  @Output() respostaVoos = new EventEmitter();
  protected dataService: CompleterData;
  model: any = {};
  recebeVoos: any = {};

  constructor(private completerService: CompleterService, private vooservice: VoosService) {
    this.dataService = this.completerService.local(this.recebeVoos, 'PlaceName', 'PlaceName');
    this.pegarvoos('al');
   }

  ngOnInit() {
    this.pegarvoos('al');
  }

  public async buscarAero(event: any, ida: boolean) {
    if (ida) {
      await this.pegarvoos(this.model.ida);
    } else {
      await this.pegarvoos(this.model.volta);
    }

  }

  public onItemSelect(selected: CompleterItem, ida: boolean) {
    // Quando selecionado o estado, buscamos o Id, true = Ida, false = Volta -- para saber o campo
    if (selected && ida) {
      // selected.originalObject.PlaceId;
    } else if (selected && !ida) {
      // selected.originalObject.PlaceId;
    }
  }

  async pegarvoos(aeroporto: string) {
    await this.vooservice.getAirport(aeroporto).subscribe(dados => {
      this.recebeVoos = dados['Places'];
      this.atualizarBinding();
    });
  }

  atualizarBinding() {
    this.dataService = this.completerService.local(this.recebeVoos, 'PlaceName', 'PlaceName');
  }
}
