import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FootballService } from '../../services/football.service';

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
}

// Define a estrutura da resposta para pesquisa de equipa
interface TeamResponse {
  team: { id: number };
}

// Define a estrutura da resposta para o plantel
interface SquadResponse {
  players: Player[];
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  players: Player[] = [];
  teamName = '';
  private footballService = inject(FootballService);

  onSearch() {
    if (!this.teamName) return;

    this.footballService.getTeamIdByName(this.teamName).subscribe({
      next: (data: { response: TeamResponse[] }) => {
        if (data.response && data.response.length > 0) {
          const teamId = data.response[0].team.id.toString();
          this.loadPlayers(teamId);
        } else {
          alert('Equipa não encontrada!');
        }
      }
    });
  }

  private loadPlayers(id: string) {
    this.footballService.getPlayersByTeamId(id).subscribe({
      next: (data: { response: SquadResponse[] }) => {
        this.players = data.response?.[0]?.players || [];
      }
    });
  }
}