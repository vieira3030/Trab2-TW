/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service'; 
import { FootballService } from '../../services/football.service'; 
import { FavoriteService, FavoritePlayer } from '../../services/favorite.service';

// Define a estrutura de dados do jogador
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

  isFavorite = false;
  showModal = false; 
  
  private toastService = inject(ToastService);
  private footballService = inject(FootballService); 
  private favoriteService = inject(FavoriteService);

  ngOnInit() {
    this.checkIfFavorite();
  }

  checkIfFavorite() {
    if (!this.player.id) return;

    this.favoriteService.getFavorites().subscribe({
      next: (favs: FavoritePlayer[]) => {
        this.isFavorite = favs.some(fav => fav.playerId === this.player.id);
      },
      // CORREÇÃO: Adicionado tipo 'any' ao erro
      error: (err: any) => console.error('Erro ao verificar favoritos:', err)
    });
  }

  toggleFavorite(event: Event) {
    event.stopPropagation(); 

    if (!this.player.id) return;

    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.player.id).subscribe({
        // CORREÇÃO: Adicionado tipo 'any' à resposta e ao erro
        next: (res: any) => {
          this.isFavorite = false;
          this.toastService.show('Jogador removido dos favoritos! ❌');
        },
        error: (err: any) => console.error('Erro ao remover favorito:', err)
      });
    } else {
      this.favoriteService.addFavorite(this.player).subscribe({
        // CORREÇÃO: Adicionado tipo 'any' à resposta e ao erro
        next: (_res: any) => {
          this.isFavorite = true;
          this.toastService.show('Jogador guardado com sucesso! ⭐');
        },
        error: (err: any) => console.error('Erro ao guardar favorito:', err)
      });
    }
  }

  openModal() {
    this.showModal = true;
    
    console.log('1. Dados atuais do jogador:', this.player);
    
    if (this.player.id && !this.player.weight) {
      console.log(`2. A pedir detalhes do ID ${this.player.id} à API...`);
      
      this.footballService.getPlayerDetails(this.player.id).subscribe({
        next: (data: any) => {
          console.log('3. Resposta da API:', data);
          
          const playerInfo = data.response[0]?.player;
          const statsInfo = data.response[0]?.statistics[0];

          if (playerInfo && statsInfo) {
            this.player.weight = playerInfo.weight;
            this.player.height = playerInfo.height;
            this.player.goals = statsInfo.goals.total || 0;
            this.player.minutes = statsInfo.games.minutes || 0;
            this.player.assists = statsInfo.goals.assists || 0;
            this.player.yellowCards = statsInfo.cards.yellow || 0;
            this.player.redCards = statsInfo.cards.red || 0;
            this.player.rating = statsInfo.games.rating ? String(statsInfo.games.rating).substring(0, 4) : 'N/A';
          }
        },
        error: (err: any) => {
          console.error('ERRO DA API:', err);
        }
      });
    } else if (!this.player.id) {
      console.warn('ERRO: O jogador não tem ID! A pesquisa inicial não guardou o ID.');
    }
  }

  closeModal(event: Event) {
    event.stopPropagation();
    this.showModal = false;
  }
}