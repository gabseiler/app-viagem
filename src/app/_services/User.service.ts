import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://api-app-viagem.herokuapp.com/rest-auth/user/';


  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(this.baseUrl, {
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
   }).pipe(
     map((response: any) => {
          // em user tenho o token do response user['token']
          const user = response;
          // se for diferente de nulo
          if (user) {
            localStorage.setItem('clienteId', user.pk);
            localStorage.setItem('clienteNome', user.username);
            localStorage.setItem('clienteEmail', user.email);
          }
    })
  );

  }

}
