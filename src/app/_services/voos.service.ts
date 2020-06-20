import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': environment.rapidapikey,
    'useQueryString': 'true',
    'Access-Control-Allow-Origin': environment.cors
  })
};

@Injectable({
  providedIn: 'root'
})

export class VoosService {

  baseUrlPlaces = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/BR/BRL/pt-BR/';
  baseUrlDates = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/BR/BRL/pt-BR/';
  constructor(private http: HttpClient) { }

   getAirport(city: any) {
    return this.http.get(this.baseUrlPlaces + '?query=' + city, httpOptions);
   }

   getVoo(origem: any, destino: any, dataIda: any, dataVolta: any) {
     if (dataVolta === 'anytime') {
        return this.http.get(this.baseUrlDates + origem + '/' + destino + '/'
                         + dataIda + '?inboundPartialDate=' + dataVolta, httpOptions);
     } else {
        return this.http.get(this.baseUrlDates + origem + '/' + destino + '/'
                         + dataIda + '/' + dataVolta, httpOptions);
     }
   }


}
