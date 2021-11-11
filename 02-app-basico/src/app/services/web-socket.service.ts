import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socketStatus = false;
  // public usuario: Usuario;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket,
    private router : Router
    ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    // this.emit('configurar-usuario', { nombre }, (resp) => {
    //   console.log('resp...', resp);
    // });
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve(null);
      });
    });
  }

  // guardar el local storage
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
  // leer del storage
  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }

  wsLogout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payLoad = {
      nombre: 'sin-nombre',
    };
    this.emit('configurar-usuario', payLoad, () => {});
    this.router.navigateByUrl('');
  }
}
