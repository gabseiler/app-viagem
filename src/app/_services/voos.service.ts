import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { debounceTime, retry, delay, retryWhen, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '4bf058aaedmshcc2bece183a5c6dp167b49jsn285f6fdd4888',
    'useQueryString': 'true',
    'Access-Control-Allow-Origin': '*'
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
    return this.http.get(this.baseUrlPlaces + '?query=' + city, httpOptions).pipe(debounceTime(300));
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
