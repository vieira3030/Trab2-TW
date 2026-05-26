import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Define a estrutura dos dados enviados no login e registo
export interface AuthPayload {
  email?: string;
  password?: string;
  username?: string;
}

// Define a estrutura da resposta do servidor
export interface AuthResponse {
  accessToken: string;
  username: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth/';
  
  // Substitui o constructor pela injeção de dependências moderna
  private http = inject(HttpClient);
  
  // Controla o estado global do login
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  // Verifica se o token existe na memória do browser
  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Guarda os dados de sessão e emite o novo estado
  setLoggedIn(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.loggedIn.next(true);
  }

  // Remove os dados de sessão e emite o novo estado
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
  }

  // Envia pedido de registo com tipagem estrita
  register(user: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + 'register', user);
  }

  // Envia pedido de login com tipagem estrita
  login(credentials: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + 'login', credentials);
  }
}