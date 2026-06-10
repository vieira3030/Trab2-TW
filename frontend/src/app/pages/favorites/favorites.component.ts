/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa o componente do cartão de jogador
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { FavoriteService, FavoritePlayer } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service'; 

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './favorites.component.html',
  // Nota: Se o teu ficheiro for .scss, muda a extensão aqui em baixo para .scss
  styleUrl: './favorites.component.css' 
})
export class FavoritesComponent implements OnInit {
  favorites: FavoritePlayer[] = [];

  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);

  // Executa automaticamente quando a página abre
  ngOnInit() {
    this.loadFavorites();
  }

  // Carrega e mapeia os favoritos da base de dados
  loadFavorites() {
    this.favoriteService.getFavorites().subscribe({
      next: (data: any[]) => {
        // Mapeia os campos da BD para o formato que o app-player-card exige
        this.favorites = data.map(player => ({
          ...player,
          id: player.playerId, 
          name: player.playerName, 
          photo: player.playerPhoto 
        }));
      },
      error: (err: any) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  // Pede à API para remover o jogador e atualiza o ecrã
  removeFavorite(playerId: number) {
    this.favoriteService.removeFavorite(playerId).subscribe({
      next: () => {
        // Remove o jogador da lista visível no ecrã sem recarregar a página
        this.favorites = this.favorites.filter(p => p.id !== playerId);
        this.toastService.show('Jogador removido da lista! ❌');
      },
      error: (err: any) => console.error('Erro ao remover jogador:', err)
    });
  }
}