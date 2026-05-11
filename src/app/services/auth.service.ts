// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Endereço do servidor do Rodrigo
  private API_URL = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) { }

  // Faz o pedido de registo ao backend
  register(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'register', user);
  }

  // Faz o pedido de login e recebe o token
  login(credentials: any): Observable<any> {
    return this.http.post(this.API_URL + 'login', credentials);
  }
}