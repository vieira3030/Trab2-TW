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
    photo: 'https://images.impresa.pt/sicnot/2026-05-22-cristiano-ronaldo-al-nassr--4-.jpg-f1e30469/original'
  };
}