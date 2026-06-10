/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service'; 
import { FootballService } from '../../services/football.service'; 
import { FavoriteService, FavoritePlayer } from '../../services/favorite.service';
import { ComparisonService } from '../../services/comparison.service'; 

export interface PlayerData {
  id?: number;
  name: string;
  club?: string;
  goals?: number;
  position?: string;
  age?: number;
  photo: string;
  weight?: string;   
  height?: string;   
  minutes?: number;  
  assists?: number;     
  yellowCards?: number; 
  redCards?: number;    
  rating?: string;       
}

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent implements OnInit {
  @Input() player: PlayerData = {
    id: 0,
    name: 'Cristiano Ronaldo',
    photo: 'https://images.impresa.pt/sicnot/2026-05-22-cristiano-ronaldo-al-nassr--4-.jpg-f1e30469/original'
  };

  // Diz ao cartão se ele está dentro da Arena de Comparação
  @Input() isArenaView = false;

  isFavorite = false;
  showModal = false; 
  
  private toastService = inject(ToastService);
  private footballService = inject(FootballService); 
  private favoriteService = inject(FavoriteService);
  private comparisonService = inject(ComparisonService); 

  ngOnInit() {
    this.checkIfFavorite();
  }

  checkIfFavorite() {
    if (!this.player.id) return;

    this.favoriteService.getFavorites().subscribe({
      next: (favs: FavoritePlayer[]) => {
        this.isFavorite = favs.some(fav => fav.playerId === this.player.id);
      },
      error: (err: any) => console.error('Erro ao verificar favoritos:', err)
    });
  }

  toggleFavorite(event: Event) {
    event.stopPropagation(); 
    if (!this.player.id) return;

    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.player.id).subscribe({
        next: () => {
          this.isFavorite = false;
          this.toastService.show('Jogador removido dos favoritos! ❌');
        },
        error: (err: any) => console.error('Erro ao remover favorito:', err)
      });
    } else {
      this.favoriteService.addFavorite(this.player).subscribe({
        next: () => {
          this.isFavorite = true;
          this.toastService.show('Jogador guardado com sucesso! ⭐');
        },
        error: (err: any) => console.error('Erro ao guardar favorito:', err)
      });
    }
  }

  // --- ENVIA PARA A ARENA ---
  addToArena(event: Event) {
    event.stopPropagation(); 
    this.comparisonService.addPlayerToArena(this.player);
    this.toastService.show(this.player.name + ' enviado para a Arena! ⚔️');
  }

  openModal() {
    // Se o cartão estiver na Arena, bloqueia a abertura do painel individual
    if (this.isArenaView) return;

    this.showModal = true;
    
    if (this.player.id && !this.player.weight) {
      this.footballService.getPlayerDetails(this.player.id).subscribe({
        next: (data: any) => {
          const playerInfo = data.response[0]?.player;
          const statsInfo = data.response[0]?.statistics[0];

          if (playerInfo && statsInfo) {
            this.player.weight = playerInfo.weight;
            this.player.height = playerInfo.height;
            this.player.age = playerInfo.age; 
            this.player.goals = statsInfo.goals.total || 0;
            this.player.minutes = statsInfo.games.minutes || 0;
            this.player.assists = statsInfo.goals.assists || 0;
            this.player.yellowCards = statsInfo.cards.yellow || 0;
            this.player.redCards = statsInfo.cards.red || 0;
            this.player.rating = statsInfo.games.rating ? String(statsInfo.games.rating).substring(0, 4) : 'N/A';
          }
        },
        error: (err: any) => console.error('ERRO DA API:', err)
      });
    }
  }

  closeModal(event: Event) {
    event.stopPropagation();
    this.showModal = false;
  }
}