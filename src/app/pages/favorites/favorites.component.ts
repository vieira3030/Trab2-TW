import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa o cartão e a interface de dados do jogador
import { PlayerCardComponent, PlayerData } from '../../components/player-card/player-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  // Lista que vai guardar os jogadores favoritos
  favoritePlayers: PlayerData[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  // Vai buscar a lista de favoritos guardada no localStorage
  loadFavorites() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.favoritePlayers = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
  }
}