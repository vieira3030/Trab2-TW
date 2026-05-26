import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Guarda a mensagem atual e avisa os componentes de forma reativa
  message = new BehaviorSubject<string | null>(null);

  // Mostra a mensagem e define um temporizador para a apagar após 3 segundos
  show(msg: string) {
    this.message.next(msg);
    setTimeout(() => {
      this.message.next(null);
    }, 3000);
  }
}