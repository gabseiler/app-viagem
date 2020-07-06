import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ClienteNome: any;
  constructor(private authService: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    this.ClienteNome = localStorage.getItem('clienteNome');
  }
  loggedIn() {
    // const token = localStorage.getItem('token');
    // a exclamaçao dupla seta a variavel como boolean, retornando true se estiver preenchida e false caso contrario
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout().subscribe(data =>
      this.alert.message("Logout"));

    // tslint:disable-next-line: forin
    for (let a in localStorage) {
      localStorage.removeItem(a);
    }
  }
}
