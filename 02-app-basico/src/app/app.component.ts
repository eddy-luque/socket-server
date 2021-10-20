import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { ChatServiceService } from './services/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AppBasico';

  constructor(
    //  private wsService: WebSocketService,
    private chatService: ChatServiceService
  ) {}
  ngOnInit(): void {
    // this.chatService.sendMessage('Hola desde Angular con HOLA MUNDO');
    this.chatService.getMessagesPrivate().subscribe((resp) => {
      console.log('resp. privado : ', resp);
    });
  }
}
