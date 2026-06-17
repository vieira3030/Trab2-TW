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

  ngOnInit() {
    // Subscreve as alterações da Arena em tempo real
    this.comparisonService.currentPlayers$.subscribe(players => {
      this.player1 = players[0] || null;
      this.player2 = players[1] || null;
    });
  }

  openDuelo() {
    if (!this.player1 || !this.player2) {
      this.toastService.show('Precisas de 2 jogadores para o duelo! ⚠️');
      return;
    }
    this.showModal = true;
    this.loadPlayerStats(this.player1);
    this.loadPlayerStats(this.player2);
  }

  closeModal() {
    this.showModal = false;
  }

  loadPlayerStats(player: PlayerData) {
    if (player.id && player.goals === undefined) {
      this.footballService.getPlayerDetails(player.id).subscribe({
        next: (data: any) => {
          const playerInfo = data.response[0]?.player;
          const statsInfo = data.response[0]?.statistics[0];
          
          if (playerInfo && statsInfo) {
            player.goals = statsInfo.goals.total || 0;
            player.assists = statsInfo.goals.assists || 0;
            player.rating = statsInfo.games.rating ? String(statsInfo.games.rating).substring(0, 4) : 'N/A';
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

  // Grava o vencedor e os dois jogadores no histórico
  chooseWinner(winner: PlayerData) {
    // 1. Guarda IMEDIATAMENTE no localStorage (Para aparecer no Perfil sem falhas)
    const historico = JSON.parse(localStorage.getItem('olheiro_historico') || '[]');
    
    historico.push({ 
      player1Id: this.player1?.id,
      player1Name: this.player1?.name, 
      player1Photo: this.player1?.photo,
      
      player2Id: this.player2?.id,
      player2Name: this.player2?.name,
      player2Photo: this.player2?.photo,
      
      winner: winner.name 
    });
    
    localStorage.setItem('olheiro_historico', JSON.stringify(historico));

    // 2. Fecha a janela do duelo e limpa a arena logo a seguir
    this.closeModal();
    this.comparisonService.clearArena(); 
    
    // 3. Tenta enviar para o backend de forma silenciosa
    this.comparisonService.saveComparison(this.player1, this.player2, winner.name).subscribe({
      next: () => {
        // Se a base de dados aceitar, mostra mensagem de sucesso total
        this.toastService.show(`🏆 ${winner.name} venceu! Guardado online e no Perfil.`);
      },
      error: (err: any) => {
        console.error('Erro ao guardar na Base de Dados (401):', err);
        // Se o token falhar, a app não bloqueia e avisa o utilizador
        this.toastService.show(`🏆 ${winner.name} venceu! Comparação guardada no teu perfil.`);
      }
    });
  }
}