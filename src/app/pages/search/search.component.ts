import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { FootballService } from '../../services/football.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Array normal para guardar os jogos
  matches: any[] = [];

  constructor(private footballService: FootballService) {}

  onSearch() {
    this.footballService.getMatches().subscribe({
      next: (data: any) => {
        // Guarda os jogos recebidos da API
        this.matches = data.matches || [];
        console.log('Jogos carregados com sucesso:', this.matches);
      },
      error: (err) => {
        console.error('Erro ao chamar a API:', err);
      }
    });
  }
}