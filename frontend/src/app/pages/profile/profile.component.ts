/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ComparisonService } from '../../services/comparison.service'; // IMPORTANTE: Adicionar isto

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  role: string = '';
  isEditing: boolean = false;
  history: any[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);
  private comparisonService = inject(ComparisonService); // Injetar o serviço da Arena

  ngOnInit() {
    this.username = localStorage.getItem('olheiro_username') || 'vieira3030';
    this.role = localStorage.getItem('olheiro_role') || 'Caça-Talentos (com miopia)';

    const historicoGuardado = localStorage.getItem('olheiro_historico');
    if (historicoGuardado) {
      this.history = JSON.parse(historicoGuardado); 
    } else {
      this.history = []; 
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; 
    
    if (!this.isEditing) {
      console.log('A guardar novos dados:', this.username, this.role);
      localStorage.setItem('olheiro_username', this.username);
      localStorage.setItem('olheiro_role', this.role);
    }
  }

  eliminarDuelo(index: number) {
    this.history.splice(index, 1);
    localStorage.setItem('olheiro_historico', JSON.stringify(this.history));
  }

  // --- NOVA FUNÇÃO QUE ENVIA OS DADOS PARA A ARENA ---
  verNaArena(duelo: any) {
    // Reconstrói os jogadores com base nos dados do histórico
    const p1 = {
      id: duelo.player1Id,
      name: duelo.player1Name || duelo.player1, // Suporta os duelos antigos que só tinham o nome
      photo: duelo.player1Photo || '' 
    };

    const p2 = {
      id: duelo.player2Id,
      name: duelo.player2Name || duelo.player2,
      photo: duelo.player2Photo || ''
    };

    // Envia os jogadores para a memória da Arena
    this.comparisonService.loadComparisonFromProfile(p1, p2);

    // Redireciona o utilizador
    this.router.navigate(['/comparar']);
  }

  logout() {
    console.log('A terminar sessão e a limpar dados...');
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}