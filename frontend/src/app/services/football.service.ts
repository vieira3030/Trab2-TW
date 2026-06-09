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

  // Alterado para 'search=' para permitir procurar equipas por partes do nome
  getTeamIdByName(teamName: string) {
    return this.http.get<any>(`${this.baseUrl}/teams?search=${teamName}`);
  }

  // Obtém o plantel atual completo de uma equipa
  getPlayersByTeamId(teamId: number) {
    return this.http.get<any>(`${this.baseUrl}/players/squads?team=${teamId}`);
  }

  // Pede os detalhes e força a época para obter estatísticas numéricas (Golos, Minutos, etc.)
  getPlayerDetails(id: number) {
    return this.http.get<any>(`${this.baseUrl}/players`, {
      // Dica: Se os dados de 2023 continuarem a zero, altera para '2024' (época atual)
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