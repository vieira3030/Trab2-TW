import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FootballService } from '../../services/football.service';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';

// Define a estrutura de dados do jogador
export interface Player {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PlayerCardComponent], 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  players: Player[] = [];
  teamName = '';
  
  // Novas variáveis para controlar o carregamento e os erros no HTML
  isLoading = false;
  errorMessage = '';
  
  private footballService = inject(FootballService);

  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Inicia a pesquisa pelo nome da equipa inserido
  onSearch() {
    if (!this.teamName) return;

    // 1. Limpa erros antigos, limpa jogadores e liga a animação
    this.errorMessage = '';
    this.players = [];
    this.isLoading = true;

    console.log(`1. A pesquisar a equipa: ${this.teamName}...`);

    this.footballService.getTeamIdByName(this.teamName).subscribe({
      next: (data: any) => {
        console.log('2. Resposta da API ao procurar equipa:', data);

        // Se a equipa for encontrada, extrai o ID e carrega o plantel
        if (data.response && data.response.length > 0) {
          const teamId = data.response[0].team.id;
          console.log(`3. ID da equipa encontrado: ${teamId}. A carregar jogadores...`);
          this.loadPlayers(teamId);
        } else {
          // 2. Substitui o 'alert' nativo pela variável que o HTML vai mostrar
          this.errorMessage = 'Equipa não encontrada! Verifica o nome e tenta novamente.';
          this.isLoading = false; // Desliga a animação
        }
      },
      error: (err: any) => {
        console.error('Erro de ligação ao tentar procurar a equipa:', err);
        this.errorMessage = 'Erro de ligação à API. Tenta novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  // Carrega todos os jogadores do plantel da equipa
  private loadPlayers(id: number) {
    console.log(`4. A pedir plantel da equipa ${id}...`);
    
    this.footballService.getPlayersByTeamId(id).subscribe({
      next: (data: any) => {
        console.log('5. Resposta completa do plantel:', data);
        
        // Guarda a lista completa de jogadores devolvida pela API
        this.players = data.response?.[0]?.players || [];
        console.log('6. Plantel completo guardado:', this.players);
        
        // 3. Tudo correu bem, desliga a animação de carregamento
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro de ligação ao pedir jogadores:', err);
        this.errorMessage = 'Erro ao carregar os jogadores. Tenta novamente.';
        this.isLoading = false;
      }
    });
  }
}