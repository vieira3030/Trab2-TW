import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FootballService } from '../../services/football.service';
// Importa o componente do cartão de jogador
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

// Define a estrutura da resposta para procurar a equipa
interface TeamResponse {
  team: { id: number };
}

// Define a estrutura da resposta para listar o plantel
interface SquadResponse {
  players: Player[];
}

@Component({
  selector: 'app-search',
  standalone: true,
  // Associa os módulos e componentes necessários
  imports: [CommonModule, FormsModule, PlayerCardComponent], 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  players: Player[] = [];
  teamName = '';
  
  // Injeta o serviço de futebol para comunicar com a API
  private footballService = inject(FootballService);

  // Executa a pesquisa ao submeter o formulário
  onSearch() {
    if (!this.teamName) return;

    // Procura o ID da equipa através do nome inserido
    this.footballService.getTeamIdByName(this.teamName).subscribe({
      next: (data: { response: TeamResponse[] }) => {
        if (data.response && data.response.length > 0) {
          // Extrai o ID da equipa (mantido como número)
          const teamId = data.response[0].team.id;
          this.loadPlayers(teamId);
        } else {
          alert('Equipa não encontrada!');
        }
      }
    });
  }

  // Carrega a lista de jogadores usando o ID numérico da equipa
  private loadPlayers(id: number) {
    this.footballService.getPlayersByTeamId(id).subscribe({
      next: (data: { response: SquadResponse[] }) => {
        // Atualiza a lista de jogadores com a resposta da API
        this.players = data.response?.[0]?.players || [];
      }
    });
  }
}