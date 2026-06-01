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
  private footballService = inject(FootballService);

  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Inicia a pesquisa pelo nome da equipa inserido
  onSearch() {
    if (!this.teamName) return;

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
          alert('Equipa não encontrada! Abre a consola (F12) para ver o erro escondido da API.');
        }
      },
      error: (err: any) => {
        console.error('Erro de ligação ao tentar procurar a equipa:', err);
      }
    });
  }

  // Obtém a lista de jogadores da equipa especificada
  private loadPlayers(id: number) {
    console.log(`4. A pedir plantel da equipa ${id}...`);
    
    this.footballService.getPlayersByTeamId(id).subscribe({
      next: (data: any) => {
        console.log('5. Resposta completa do plantel:', data);
        
        // Guarda a lista completa de jogadores devolvida pela API
        this.players = data.response?.[0]?.players || [];
        
        console.log('6. Plantel completo guardado:', this.players);
      },
      error: (err: any) => {
        console.error('Erro de ligação ao pedir jogadores:', err);
      }
    });
  }
}