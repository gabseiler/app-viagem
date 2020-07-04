import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    'x-rapidapi-key': '0e3056d71amshd616de54b80603dp1c42c3jsna531b4e8b76c',
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
