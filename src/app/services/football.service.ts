import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private baseUrl = 'https://v3.football.api-sports.io';
  
  private headers = new HttpHeaders({
    'x-apisports-key': 'ba5b2eebc07b5b528094756dda9d02dd',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  });

  private http = inject(HttpClient);

  /* eslint-disable @typescript-eslint/no-explicit-any */

  getPlayerDetails(playerId: number) {
    return this.http.get<any>(`${this.baseUrl}/players?id=${playerId}&season=2023`, { headers: this.headers });
  }

  getTeamIdByName(teamName: string) {
    return this.http.get<any>(`${this.baseUrl}/teams?name=${teamName}`, { headers: this.headers });
  }

  getPlayersByTeamId(teamId: number) {
    return this.http.get<any>(`${this.baseUrl}/players?team=${teamId}&season=2023`, { headers: this.headers });
  }
}