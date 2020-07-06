import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerMode = false;

  model: any = {};
  constructor(private router: Router, private authService: AuthService,
    private userService: UserService, private alert: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(() => {
      this.alert.success('Login efetuado com sucesso.');
      this.router.navigate(['/carrinho']);
    }, error => {
      console.log(error);
      if (error['non_field_errors']) {
        this.alert.error(error['non_field_errors'][0]);
      }
      if (error['password']) {
        this.alert.error('Senha: ' + error['password'][0]);
      }
    });

    this.userService.getUser().subscribe(data => {
      console.log('Get User');
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.router.navigate(['/carrinho']);
  }

  changeRegisterMode() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
