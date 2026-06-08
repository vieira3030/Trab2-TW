/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para os inputs de texto
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ComparisonService } from '../../services/comparison.service'; // Serviço de comparações
import { ToastService } from '../../services/toast.service'; // Serviço de notificações

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private comparisonService = inject(ComparisonService);
  private toastService = inject(ToastService);

  // Dados do utilizador
  username = '';
  role = ''; 

  // Variáveis para controlar o modo de edição
  isEditing = false;
  editUsername = '';

  // Lista de funções (roles) disponíveis
  funnyRoles = [
    'Olheiro Oficial',
    'Treinador de Bancada',
    'Analista de Sofá',
    'Mister das Táticas',
    'Especialista em Cargas de Ombro',
    'Caça-Talentos (com miopia)'
  ];

  // Array que guarda as comparações recebidas da API
  comparisons: any[] = [];

  ngOnInit() {
    // Carrega os dados guardados do perfil
    this.username = localStorage.getItem('username') || 'Utilizador';
    this.role = localStorage.getItem('role') || 'Olheiro Oficial';
    
    // Carrega o histórico ao abrir a página
    this.loadComparisons();
  }

  // Ativa os campos de texto e prepara o nome atual
  startEdit() {
    this.isEditing = true;
    this.editUsername = this.username;
  }

  // Guarda as alterações na memória do browser e fecha a edição
  saveProfile() {
    this.username = this.editUsername;
    localStorage.setItem('username', this.username);
    localStorage.setItem('role', this.role);
    this.isEditing = false;
  }

  // Limpa a sessão e volta ao ecrã de login
  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  // Pede a lista de comparações históricas à API
  loadComparisons() {
    this.comparisonService.getComparisons().subscribe({
      next: (data) => this.comparisons = data,
      error: (err) => console.error('Erro ao carregar comparações', err)
    });
  }

  // Remove comparação na API e atualiza a lista visualmente
  removeComparison(id: number) {
    this.comparisonService.deleteComparison(id).subscribe({
      next: () => {
        this.comparisons = this.comparisons.filter(c => c.id !== id);
        this.toastService.show('Comparação apagada com sucesso! 🗑️');
      },
      error: (err) => console.error('Erro ao apagar comparação', err)
    });
  }

  // Reabre uma comparação antiga na Arena
  abrirComparacao(comp: any) {
    // Reconstrói os dois jogadores com a informação guardada na BD
    const p1 = { id: comp.player1Id, name: comp.player1Name, photo: comp.player1Photo };
    const p2 = { id: comp.player2Id, name: comp.player2Name, photo: comp.player2Photo };
    
    // Carrega para a memória do serviço e redireciona para a Arena
    this.comparisonService.loadComparisonFromProfile(p1, p2);
    this.router.navigate(['/comparar']);
  }
}