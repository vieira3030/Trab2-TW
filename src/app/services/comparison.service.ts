import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  // O URL da rota que o Rodrigo criou
  private apiUrl = 'http://localhost:8080/api/comparisons';
  
  private http = inject(HttpClient);

  // Envia os dados dos dois jogadores para a base de dados
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  saveComparison(player1: any, player2: any) {
    const body = {
      player1Id: player1.id,
      player1Name: player1.name,
      player1Photo: player1.photo,
      player2Id: player2.id,
      player2Name: player2.name,
      player2Photo: player2.photo
    };
    return this.http.post(this.apiUrl, body);
  }
}