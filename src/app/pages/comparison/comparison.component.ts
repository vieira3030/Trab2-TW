import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa o cartão que criaste anteriormente
import { PlayerCardComponent, PlayerData } from '../../components/player-card/player-card.component';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent {
  // Dados fictícios do Jogador 1 para testar o visual
  player1: PlayerData = {
    id: 147,
    name: 'João Félix',
    photo: 'https://media.api-sports.io/football/players/147.png',
    club: 'FC Barcelona',
    position: 'Attacker'
  };

  // Dados fictícios do Jogador 2 para testar o visual
  player2: PlayerData = {
    id: 148,
    name: 'Rafael Leão',
    photo: 'https://media.api-sports.io/football/players/148.png',
    club: 'AC Milan',
    position: 'Attacker'
  };

  // Função vazia por agora (o Eduardo preenche depois)
  saveComparison() {
    console.log('Botão clicado! O Eduardo vai tratar de enviar isto para a API.');
  }
}