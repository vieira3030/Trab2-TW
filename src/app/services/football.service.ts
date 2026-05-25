import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  
  // Injeta o HttpClient para os pedidos HTTP
  constructor(private http: HttpClient) {}

  getMatches() {
    // Configura o cabeçalho com o token correto
    const headers = new HttpHeaders({
      'X-Auth-Token': environment.apiKey
    });

    // Faz o pedido através do proxy '/v4/'
    return this.http.get('https://api.football-data.org/v4/matches');
  }
}