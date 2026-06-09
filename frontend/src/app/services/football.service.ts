import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  // Aponta para a ponte criada no backend em vez da API externa
  private baseUrl = 'https://trab2-tw.onrender.com/api/football';
  
  private http = inject(HttpClient);

  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Procura o ID da equipa através do nome
  getTeamIdByName(teamName: string) {
    return this.http.get<any>(`${this.baseUrl}/teams?name=${teamName}`);
  }

  // Obtém o plantel atual completo de uma equipa
  getPlayersByTeamId(teamId: number) {
    return this.http.get<any>(`${this.baseUrl}/players/squads?team=${teamId}`);
  }

  // Vai buscar os detalhes e estatísticas de um jogador específico
  getPlayerDetails(id: number) {
    return this.http.get<any>(`${this.baseUrl}/players`, {
      params: { id: id.toString(), season: '2023' } 
    });
  }

  // Pesquisa jogadores através do nome
  searchPlayers(name: string) {
    return this.http.get<any>(`${this.baseUrl}/players`, {
      params: { search: name }
    });
  }
}