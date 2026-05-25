import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {
  // Recebe os dados do jogador; usa dados de teste por defeito
  @Input() player: any = {
    name: 'Cristiano Ronaldo',
    club: 'Al Nassr',
    goals: 973,
    photo: 'https://placehold.co/150x150/png?text=CR7'
  };
}