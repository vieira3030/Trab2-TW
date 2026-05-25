import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa o componente do cartão de jogador
import { PlayerCardComponent } from '../../components/player-card/player-card.component'; 

@Component({
  selector: 'app-search',
  standalone: true,
  // Coloca o PlayerCardComponent nos imports para o Angular o reconhecer no HTML
  imports: [CommonModule, PlayerCardComponent], 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // Função ativada pelo clique no botão
  onSearch() {
    console.log('Pesquisa iniciada!');
  }
}