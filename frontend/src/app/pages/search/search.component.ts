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
  // Importa o cartão do jogador para poder ser usado no HTML
  imports: [CommonModule, FormsModule, PlayerCardComponent], 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  players: Player[] = [];
  teamName = ''; // Variável correta ligada ao input
  isLoading = false;
  errorMessage = '';
  
  private footballService = inject(FootballService);

  // Inicia a pesquisa pelo nome da equipa inserido
  onSearch() {
    if (!this.teamName) return;

    this.errorMessage = '';
    this.players = [];
    this.isLoading = true;

    this.footballService.getTeamIdByName(this.teamName).subscribe({
      next: (data: any) => {
        if (data.response && data.response.length > 0) {
          const teamId = data.response[0].team.id;
          this.loadPlayers(teamId);
        } else {
          this.errorMessage = 'Equipa não encontrada! Verifica o nome e tenta novamente.';
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Erro de ligação à API. Tenta novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  // Carrega todos os jogadores do plantel da equipa
  private loadPlayers(id: number) {
    this.footballService.getPlayersByTeamId(id).subscribe({
      next: (data: any) => {
        this.players = data.response?.[0]?.players || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Erro ao carregar os jogadores. Tenta novamente.';
        this.isLoading = false;
      }
    });
  }
}