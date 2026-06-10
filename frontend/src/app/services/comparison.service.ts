import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'; // <-- IMPORTANTE: Importar o BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private apiUrl = 'https://trab2-tw.onrender.com/api/comparisons';
  private http = inject(HttpClient);

  // --- FUNÇÃO DE AUTENTICAÇÃO ---
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'x-access-token': token ? token : '' 
      })
    };
  }

  // --- MEMÓRIA DA ARENA (Fila Reativa) ---
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  // Lista que guarda no máximo 2 jogadores e avisa a aplicação quando muda
  private arenaPlayers = new BehaviorSubject<any[]>([]);
  
  // Variável pública que os componentes podem observar
  currentPlayers$ = this.arenaPlayers.asObservable();

  // Adiciona um jogador à fila
  addPlayerToArena(player: any) {
    const current = this.arenaPlayers.getValue();

    // Evita adicionar o mesmo jogador duas vezes seguidas
    if (current.find(p => p.id === player.id)) {
        return; 
    }

    current.push(player);

    // Se passar de 2, remove o mais antigo
    if (current.length > 2) {
      current.shift();
    }

    // Atualiza a lista para toda a aplicação
    this.arenaPlayers.next(current);
  }

  // Limpa a arena
  clearArena() {
    this.arenaPlayers.next([]); // Envia uma lista vazia
  }

  // Carrega uma comparação do Perfil
  loadComparisonFromProfile(player1: any, player2: any) {
    this.arenaPlayers.next([player1, player2]); // Envia os dois jogadores diretamente
  }

  // --- COMUNICAÇÃO COM O BACKEND ---
  saveComparison(player1: any, player2: any, winnerName: string) {
    const body = {
      player1Id: player1.id, player1Name: player1.name, player1Photo: player1.photo,
      player2Id: player2.id, player2Name: player2.name, player2Photo: player2.photo,
      winner: winnerName
    };
    return this.http.post(this.apiUrl, body, this.getAuthHeaders());
  }

  getComparisons() {
    return this.http.get<unknown[]>(this.apiUrl, this.getAuthHeaders());
  }

  deleteComparison(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}