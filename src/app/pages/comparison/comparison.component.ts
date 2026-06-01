import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa o cartão e a interface de dados
import { PlayerCardComponent, PlayerData } from '../../components/player-card/player-card.component';
// Importa os serviços para comunicação com a API e notificações
import { ComparisonService } from '../../services/comparison.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent {
  // Dados do Jogador 1
  player1: PlayerData = {
    id: 147,
    name: 'João Félix',
    photo: 'https://media.api-sports.io/football/players/147.png',
    club: 'FC Barcelona',
    position: 'Attacker'
  };

  // Dados do Jogador 2
  player2: PlayerData = {
    id: 148,
    name: 'Rafael Leão',
    photo: 'https://media.api-sports.io/football/players/148.png',
    club: 'AC Milan',
    position: 'Attacker'
  };

  // Injeta os serviços necessários
  private comparisonService = inject(ComparisonService);
  private toastService = inject(ToastService);

  // Envia os dados dos dois jogadores para a API e mostra notificação visual
  saveComparison() {
    this.comparisonService.saveComparison(this.player1, this.player2).subscribe({
      next: () => {
        this.toastService.show('Comparação guardada com sucesso! 💾');
      },
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      error: (err: any) => {
        console.error('Erro ao guardar comparação:', err);
      }
    });
  }
}