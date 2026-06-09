import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  // Aponta para a ponte criada no backend
  private baseUrl = 'https://trab2-tw.onrender.com/api/football';
  
  private http = inject(HttpClient);

  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Alterado novamente para 'name=' para combinar com o teu backend
  getTeamIdByName(teamName: string) {
    return this.http.get<any>(`${this.baseUrl}/teams?name=${teamName}`);
  }

  // Obtém o plantel atual completo de uma equipa
  getPlayersByTeamId(teamId: number) {
    return this.http.get<any>(`${this.baseUrl}/players/squads?team=${teamId}`);
  }

  // Pede os detalhes numéricos da época 2023
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