/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService, FavoritePlayer } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service'; 

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  // Guarda a lista de jogadores vindos da base de dados
  favoritePlayers: FavoritePlayer[] = [];

  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);

  // Executa automaticamente quando a página abre
  ngOnInit() {
    this.loadFavorites();
  }

  // Vai à API buscar todos os favoritos do utilizador
  loadFavorites() {
    this.favoriteService.getFavorites().subscribe({
      next: (data: FavoritePlayer[]) => {
        this.favoritePlayers = data;
      },
      error: (err: any) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  // Pede à API para apagar o jogador e atualiza o ecrã
  removePlayer(playerId: number) {
    this.favoriteService.removeFavorite(playerId).subscribe({
      next: () => {
        // Filtra a lista para remover o jogador visualmente sem recarregar a página
        this.favoritePlayers = this.favoritePlayers.filter(p => p.playerId !== playerId);
        this.toastService.show('Jogador removido da lista! ❌');
      },
      error: (err: any) => console.error('Erro ao remover jogador:', err)
    });
  }
}