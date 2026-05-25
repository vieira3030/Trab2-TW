import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  
  // Injeta o cliente HTTP
  private http = inject(HttpClient);

  // Vai buscar o plantel completo através do ID da equipa (ex: 42 é o Arsenal)
  getPlayersByTeamId(teamId: string) {
    // Configura a chave de acesso oficial da API-Sports
    const headers = new HttpHeaders({
      'x-apisports-key': 'ba5b2eebc07b5b528094756dda9d02dd'
    });

    const url = `https://v3.football.api-sports.io/players/squads?team=${teamId}`;
    
    // Executa o pedido GET
    return this.http.get(url, { headers });
  }
}