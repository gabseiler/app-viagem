import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    'x-rapidapi-key': '05d722c80bmshc442c272c1ce8b2p1c02bejsn27c28e9a6ea6',
    'useQueryString': 'true',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HoteisService {

  baseUrlAutoComplete = 'https://tripadvisor1.p.rapidapi.com/locations/auto-complete/';
  baseUrlHotelList = 'https://tripadvisor1.p.rapidapi.com/hotels/list';
constructor(private http: HttpClient) { }

  getLocationsBuscar(local: any) {
    return this.http.get(this.baseUrlAutoComplete + '?query=' + local + '&sort=relevance&limit=10&lang=pt_BR', httpOptions);
  }

  getHoteis(id: any, checkin: any, adults: any, nights: any, rooms: any) {
    return this.http.get(this.baseUrlHotelList + '?location_id=' + id +
                                                    '&checkin=' + checkin +
                                                    '&adults=' + adults +
                                                    '&nights=' + nights +
                                                    '&rooms=' + rooms +
                '&sort=recommended&limit=30&lang=pt_BR&order=asc&currency=BRL', httpOptions);
  }
}
