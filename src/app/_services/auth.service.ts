import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    baseUrl = 'http://localhost:5000/api/auth/';

    decodedToken: any;

    constructor(private http: HttpClient) { }

    login(model: any) {
      localStorage.setItem('token', model);
    }

    register(model: any) {
      return this.http.post(this.baseUrl + 'register', model);
    }

    loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
    }
}
