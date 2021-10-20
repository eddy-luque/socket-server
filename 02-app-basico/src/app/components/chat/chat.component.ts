import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  messageSubscribe: Subscription;
  mensajes: any[] = [];
  @ViewChild('contenedorChat') elemento: ElementRef;

  constructor(private chatService: ChatServiceService) {}
  ngOnDestroy(): void {
    this.messageSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.messageSubscribe = this.chatService.getMessage().subscribe((msg) => {
      console.log('chat: ', msg);
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.nativeElement.scrollTop =
          this.elemento.nativeElement.scrollHeight;
      });
    });
  }

  enviar(): void {
    // console.log('texto ... ' , this.texto);
    if (this.texto.trim().length === 0) { return; }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
