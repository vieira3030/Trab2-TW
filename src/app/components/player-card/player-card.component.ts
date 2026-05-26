/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service'; 
import { FootballService } from '../../services/football.service'; // Importa o serviço da API

// Define a estrutura de dados do jogador com as novas estatísticas
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
  assists?: number;     // Nova estatística: Assistências
  yellowCards?: number; // Nova estatística: Cartões Amarelos
  redCards?: number;    // Nova estatística: Cartões Vermelhos
  rating?: string;      // Nova estatística: Nota (Rating)
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
  private footballService = inject(FootballService); // Injeta o serviço

  // Inicia a verificação de favoritos ao carregar o cartão
  ngOnInit() {
    this.checkIfFavorite();
  }

  // Verifica se o jogador está guardado no localStorage
  checkIfFavorite() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.isFavorite = favs.some((p: PlayerData) => p.name === this.player.name);
    }
  }

  // Adiciona ou remove dos favoritos e impede a abertura do modal
  toggleFavorite(event: Event) {
    event.stopPropagation(); 

    if (typeof window !== 'undefined' && window.localStorage) {
      let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (this.isFavorite) {
        favs = favs.filter((p: PlayerData) => p.name !== this.player.name);
        this.isFavorite = false;
        this.toastService.show('Jogador removido dos favoritos! ❌');
      } else {
        favs.push(this.player);
        this.isFavorite = true;
        this.toastService.show('Jogador guardado com sucesso! ⭐');
      }
      
      localStorage.setItem('favorites', JSON.stringify(favs));
    }
  }

  // Ativa o modal e tenta procurar dados na API com logs para debug
  openModal() {
    this.showModal = true;
    
    // Mostra no ecrã de debug os dados que o cartão tem atualmente
    console.log('1. Dados atuais do jogador:', this.player);
    
    // Só chama a API se existir um ID válido e os dados ainda não estiverem carregados
    if (this.player.id && !this.player.weight) {
      console.log(`2. A pedir detalhes do ID ${this.player.id} à API...`);
      
      this.footballService.getPlayerDetails(this.player.id).subscribe({
        next: (data: any) => {
          // Mostra o que a API devolveu com sucesso
          console.log('3. Resposta da API:', data);
          
          const playerInfo = data.response[0]?.player;
          const statsInfo = data.response[0]?.statistics[0];

          if (playerInfo && statsInfo) {
            // Guarda as estatísticas base
            this.player.weight = playerInfo.weight;
            this.player.height = playerInfo.height;
            this.player.goals = statsInfo.goals.total || 0;
            this.player.minutes = statsInfo.games.minutes || 0;
            
            // Guarda as novas estatísticas extraídas da API
            this.player.assists = statsInfo.goals.assists || 0;
            this.player.yellowCards = statsInfo.cards.yellow || 0;
            this.player.redCards = statsInfo.cards.red || 0;
            
            // Formata a nota para garantir que tem um tamanho legível (ex: "7.12")
            this.player.rating = statsInfo.games.rating ? String(statsInfo.games.rating).substring(0, 4) : 'N/A';
          }
        },
        error: (err: any) => {
          // Mostra se a API bloqueou o pedido
          console.error('ERRO DA API:', err);
        }
      });
    } else if (!this.player.id) {
      // Aviso caso o ID não tenha sido passado na pesquisa inicial
      console.warn('ERRO: O jogador não tem ID! A pesquisa inicial não guardou o ID.');
    }
  }

  // Esconde o modal e impede cliques acidentais
  closeModal(event: Event) {
    event.stopPropagation();
    this.showModal = false;
  }
}