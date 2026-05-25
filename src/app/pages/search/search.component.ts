import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../../services/football.service';

// Estrutura de dados recebida pela API-Football
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
  imports: [CommonModule], 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Guarda a lista de jogadores
  players: Player[] = [];

  // Injeta o serviço
  private footballService = inject(FootballService);

  // Executa a pesquisa
  // Executa a pesquisa
onSearch() {
  this.footballService.getPlayersByTeamId('42').subscribe({
    // Substitui o 'any' pela estrutura exata que a API envia
    next: (data: { response?: { players: Player[] }[] }) => {
      
      // Verifica se a resposta traz dados e extrai a lista de jogadores
      if (data?.response && data.response.length > 0) {
        this.players = data.response[0].players;
        console.log('Plantel completo carregado:', this.players);
      } else {
        this.players = [];
      }
      
    },
    error: (err) => console.error('Erro na API:', err)
  });
}
  }
