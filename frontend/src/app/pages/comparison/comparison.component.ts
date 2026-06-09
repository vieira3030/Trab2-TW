/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent, PlayerData } from '../../components/player-card/player-card.component';
import { ComparisonService } from '../../services/comparison.service';
import { ToastService } from '../../services/toast.service';
import { FootballService } from '../../services/football.service'; 

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent implements OnInit {
  player1: PlayerData | null = null;
  player2: PlayerData | null = null;
  showModal = false; 

  private comparisonService = inject(ComparisonService);
  private toastService = inject(ToastService);
  private footballService = inject(FootballService);

  // Lê os jogadores em memória ao iniciar o componente
  ngOnInit() {
    this.player1 = this.comparisonService.player1Temp;
    this.player2 = this.comparisonService.player2Temp;
  }

  // Verifica se existem 2 jogadores, abre a janela e pede estatísticas à API
  openDuelo() {
    if (!this.player1 || !this.player2) {
      this.toastService.show('Precisas de 2 jogadores para o duelo! ⚠️');
      return;
    }
    this.showModal = true;
    this.loadPlayerStats(this.player1);
    this.loadPlayerStats(this.player2);
  }

  // Esconde a janela de duelo
  closeModal() {
    this.showModal = false;
  }

  // Pede dados estatísticos detalhados ao backend se ainda não existirem
  loadPlayerStats(player: PlayerData) {
    if (player.id && player.goals === undefined) {
      this.footballService.getPlayerDetails(player.id).subscribe({
        next: (data: any) => {
          const playerInfo = data.response[0]?.player;
          const statsInfo = data.response[0]?.statistics[0];
          
          if (playerInfo && statsInfo) {
            // Preenche estatísticas base
            player.goals = statsInfo.goals.total || 0;
            player.assists = statsInfo.goals.assists || 0;
            player.rating = statsInfo.games.rating ? String(statsInfo.games.rating).substring(0, 4) : 'N/A';
            
            // Preenche novas estatísticas adicionadas
            player.weight = playerInfo.weight || 'N/A';
            player.height = playerInfo.height || 'N/A';
            player.minutes = statsInfo.games.minutes || 0;
            player.yellowCards = statsInfo.cards.yellow || 0;
            player.redCards = statsInfo.cards.red || 0;
          }
        },
        error: (err: any) => console.error('Erro na API:', err)
      });
    }
  }

  // Envia o vencedor para o serviço, mostra notificação e limpa a arena
  chooseWinner(winner: PlayerData) {
    this.comparisonService.saveComparison(this.player1, this.player2, winner.name).subscribe({
      next: () => {
        this.toastService.show(`🏆 ${winner.name} venceu! Guardado no Perfil.`);
        this.comparisonService.clearArena(); 
        this.player1 = null;
        this.player2 = null;
        this.closeModal();
      },
      error: (err: any) => {
        console.error('Erro ao guardar:', err);
        this.toastService.show('Erro ao guardar! Verifica a tua sessão.');
      }
    });
  }
}