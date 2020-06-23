import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  loggedIn() {
    // const token = localStorage.getItem('token');
    // a exclamaçao dupla seta a variavel como boolean, retornando true se estiver preenchida e false caso contrario
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    // tslint:disable-next-line: forin
    for (let a in localStorage) {
      localStorage.removeItem(a);

    }
  }
}
