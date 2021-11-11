import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
})
export class ListaUsuarioComponent implements OnInit {
  usuariosActivosObs: Observable<any>;

  constructor(public chatService: ChatServiceService) {}

  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuariosActivos();
  }
}
