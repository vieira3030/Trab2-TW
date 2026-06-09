/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importar o componente do cartão de jogador
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { FavoriteService, FavoritePlayer } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service'; 

@Component({
  selector: 'app-favorites',
  standalone: true,
  // 2. Adicionar o PlayerCardComponent à lista de imports
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  // O nome da lista agora é 'favorites' para ligar corretamente ao HTML
  favorites: FavoritePlayer[] = [];

  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);
favoritePlayers: any;

  // Executa automaticamente quando a página abre
  ngOnInit() {
    this.loadFavorites();
  }

  // Vai à API buscar todos os favoritos do utilizador
  loadFavorites() {
    this.favoriteService.getFavorites().subscribe({
      next: (data: FavoritePlayer[]) => {
        this.favorites = data;
      },
      error: (err: any) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  // Pede à API para apagar o jogador e atualiza o ecrã
  // O nome da função agora é 'removeFavorite' para ligar ao botão de remover
  removeFavorite(playerId: number) {
    this.favoriteService.removeFavorite(playerId).subscribe({
      next: () => {
        // Filtra a lista para remover o jogador visualmente sem recarregar a página
        this.favorites = this.favorites.filter(p => p.playerId !== playerId && p.id !== playerId);
        this.toastService.show('Jogador removido da lista! ❌');
      },
      error: (err: any) => console.error('Erro ao remover jogador:', err)
    });
  }
}