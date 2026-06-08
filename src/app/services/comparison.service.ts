import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private apiUrl = 'http://localhost:8080/api/comparisons';
  private http = inject(HttpClient);

  // --- MEMÓRIA DA ARENA ---
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  player1Temp: any = null;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  player2Temp: any = null;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  addPlayerToArena(player: any) {
    if (!this.player1Temp) {
      this.player1Temp = player;
    } else {
      this.player2Temp = player;
    }
  }

  // Limpa a arena
  clearArena() {
    this.player1Temp = null;
    this.player2Temp = null;
  }

  // Carrega uma comparação do Perfil de volta para a Arena
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  loadComparisonFromProfile(player1: any, player2: any) {
    this.player1Temp = player1;
    this.player2Temp = player2;
  }

  // --- COMUNICAÇÃO COM O BACKEND ---
  // Agora envia também o nome do vencedor
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  saveComparison(player1: any, player2: any, winnerName: string) {
    const body = {
      player1Id: player1.id, player1Name: player1.name, player1Photo: player1.photo,
      player2Id: player2.id, player2Name: player2.name, player2Photo: player2.photo,
      winner: winnerName // <- Vencedor adicionado
    };
    return this.http.post(this.apiUrl, body);
  }

   
  getComparisons() {
    return this.http.get<unknown[]>(this.apiUrl);
  }

  deleteComparison(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}