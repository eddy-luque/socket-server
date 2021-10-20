import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombre = '';
  constructor(
    private wsService: WebSocketService,
    private router:Router
    ) {}

  ngOnInit(): void {}

  ingresar(): void {
    // console.log('nombre...', this.nombre);
    // this.wsService.loginWS(this.nombre);
    this.wsService.loginWS(this.nombre).then(() => {
      this.router.navigateByUrl('/mensajes');
    });
  }
}
