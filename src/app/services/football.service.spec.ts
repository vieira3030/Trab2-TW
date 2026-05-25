import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  
  constructor(private http: HttpClient) {}

  // Vai buscar a lista de jogos à API
  getMatches() {
    const headers = new HttpHeaders({
      'X-Auth-Token': environment.apiKey
    });

    return this.http.get(environment.apiUrl + 'matches', { headers });
  }
}