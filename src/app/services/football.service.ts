import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importa o 'of' para criar respostas simuladas
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private baseUrl = 'https://v3.football.api-sports.io';
  
  private headers = new HttpHeaders({
    'x-apisports-key': 'TUA_CHAVE_AQUI',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  });

  private http = inject(HttpClient);

   

  // Simula a pesquisa do ID da equipa (devolve sempre ID 42 - Arsenal)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTeamIdByName(_teamName: string) {
    const mockTeam = { response: [{ team: { id: 42 } }] };
    return of(mockTeam); 
    // PEDIDO REAL (descomentar amanhã):
    // return this.http.get<any>(`${this.baseUrl}/teams?name=${teamName}`, { headers: this.headers });
  }

  // Simula o carregamento do plantel com 2 jogadores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPlayersByTeamId(_teamId: number) {
    const mockSquad = {
      response: [{
        players: [
          { id: 1467, name: 'Bukayo Saka', age: 22, number: 7, position: 'Attacker', photo: 'https://media.api-sports.io/football/players/1467.png' },
          { id: 476, name: 'Martin Ødegaard', age: 25, number: 8, position: 'Midfielder', photo: 'https://media.api-sports.io/football/players/476.png' }
        ]
      }]
    };
    return of(mockSquad);
    // PEDIDO REAL (descomentar amanhã):
    // return this.http.get<any>(`${this.baseUrl}/players/squads?team=${teamId}`, { headers: this.headers });
  }

  // Simula as estatísticas detalhadas para o modal
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPlayerDetails(_playerId: number) {
    const mockStats = {
      response: [{
        player: { weight: '72 kg', height: '178 cm' },
        statistics: [{
          games: { minutes: 2500, rating: '7.82' },
          goals: { total: 15, assists: 10 },
          cards: { yellow: 2, red: 0 }
        }]
      }]
    };
    return of(mockStats);
    // PEDIDO REAL (descomentar amanhã):
    // return this.http.get<any>(`${this.baseUrl}/players?id=${playerId}&season=2023`, { headers: this.headers });
  }
}