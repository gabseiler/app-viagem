import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  constructor(private router: Router, private authService: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(data => {
      this.alert.success('Registro efetuado com sucesso.');
      this.router.navigate(['/reservas']);
    }, error => {
      console.log(error);
      if (error['password1']) {
        this.alert.error(error['password1'][0]);
      }
      if (error['email']) {
        this.alert.error(error['email'][0]);
      }
      if (error['username']) {
        this.alert.error(error['username'][0]);
      }
    });
  }
  cancel() {
    // estamos emitindo um boolean false para a classe pai (home), com output
    this.cancelRegister.emit(false);
  }
}
