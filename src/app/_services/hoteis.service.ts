import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    'x-rapidapi-key': '4bf058aaedmshcc2bece183a5c6dp167b49jsn285f6fdd4888',
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
