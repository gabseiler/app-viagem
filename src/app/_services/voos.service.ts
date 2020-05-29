import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '05d722c80bmshc442c272c1ce8b2p1c02bejsn27c28e9a6ea6',
    'useQueryString': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VoosService {

  baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/BR/BRL/pt-BR/';
  constructor(private http: HttpClient) { }

   getAirport(city: any) {
    return this.http.get(this.baseUrl + '?query=' + city, httpOptions);
  }


}
