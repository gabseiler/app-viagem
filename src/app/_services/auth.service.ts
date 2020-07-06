import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    baseUrl = 'https://api-app-viagem.herokuapp.com/rest-auth/';


    constructor(private http: HttpClient) { }

    login(model: any) {
      return this.http.post(this.baseUrl + 'login/', model).pipe(
      map((response: any) => {
            // em user tenho o token do response user['key']
            const user = response;
            // se for diferente de nulo
            if (user) {
              localStorage.setItem('token', user.key);
            }
      })
    );
    }

    register(model: any) {
      return this.http.post(this.baseUrl + 'registration/', model).pipe(
        map((response: any) => {
              // em user tenho o token do response user['token']
              const user = response;
              // se for diferente de nulo
              if (user) {
                localStorage.setItem('token', user.key);
              }
        })
      );
    }

    logout() {
      return this.http.post(this.baseUrl + 'logout/', '');
    }

    loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
    }
}
