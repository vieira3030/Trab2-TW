import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface que define a estrutura do jogador favorito
export interface FavoritePlayer {
  playerId: number;
  playerName: string;
  playerPhoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // O endereço da API do vosso backend
  private apiUrl = 'http://localhost:8080/api/favorites';
  
  private http = inject(HttpClient);

  // Vai buscar a lista de todos os favoritos à base de dados
  getFavorites() {
    return this.http.get<FavoritePlayer[]>(this.apiUrl);
  }

  // Envia um jogador para ser guardado na base de dados
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  addFavorite(player: any) {
    const body = {
      playerId: player.id,
      playerName: player.name,
      playerPhoto: player.photo
    };
    return this.http.post(this.apiUrl, body);
  }

  // Apaga um jogador da base de dados usando o ID
  removeFavorite(playerId: number) {
    return this.http.delete(`${this.apiUrl}/${playerId}`);
  }
}