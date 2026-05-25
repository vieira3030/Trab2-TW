import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../pages/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    'x-apisports-key': 'ba5b2eebc07b5b528094756dda9d02dd'
  });

  getTeamIdByName(name: string) {
  const url = `https://v3.football.api-sports.io/teams?search=${name}`;
  // Alterado para evitar 'any' direto
  return this.http.get<{ response: { team: { id: number } }[] }>(url, { headers: this.headers });
}

getPlayersByTeamId(teamId: string) {
  const url = `https://v3.football.api-sports.io/players/squads?team=${teamId}`;
  return this.http.get<{ response: { players: Player[] }[] }>(url, { headers: this.headers });
}
}