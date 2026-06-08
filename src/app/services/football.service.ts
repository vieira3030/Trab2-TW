import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private baseUrl = 'https://v3.football.api-sports.io';
  
  // A TUA CHAVE DA API (Substitui aqui)
  private apiKey = '8aef53ef6b47d8f9683111aba314b507';

  private http = inject(HttpClient);

  // Prepara os cabeçalhos obrigatórios para autenticação na API
  private getHeaders() {
    return new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey,
      'x-apisports-key': this.apiKey // Garantir compatibilidade com todos os endpoints
    });
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Procura o ID da equipa através do nome
  getTeamIdByName(teamName: string) {
    return this.http.get<any>(`${this.baseUrl}/teams?name=${teamName}`, { 
      headers: this.getHeaders() 
    });
  }

  // Obtém o plantel atual completo de uma equipa sem limites de paginação
  getPlayersByTeamId(teamId: number) {
    return this.http.get<any>(`${this.baseUrl}/players/squads?team=${teamId}`, { 
      headers: this.getHeaders() 
    });
  }

  // Vai buscar os detalhes e estatísticas de um jogador específico (para o modal)
  getPlayerDetails(id: number) {
    return this.http.get<any>(`${this.baseUrl}/players`, {
      headers: this.getHeaders(),
      params: { id: id.toString(), season: '2023' } 
    });
  }

  // Pesquisa jogadores através do nome (Usado no ecrã de Comparação)
  searchPlayers(name: string) {
    return this.http.get<any>(`${this.baseUrl}/players`, {
      headers: this.getHeaders(),
      params: { search: name }
    });
  }
}