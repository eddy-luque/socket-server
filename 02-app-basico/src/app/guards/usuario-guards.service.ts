import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuards implements CanActivate {
  constructor(private wsService: WebSocketService) {}
  canActivate(): boolean {
    if (this.wsService.usuario) {
      return true;
    } else {
      return false;
    }
  }
}
