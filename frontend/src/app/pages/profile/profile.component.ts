import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  // Remove um item do histórico usando o índice e atualiza o local storage
  eliminarDuelo(index: number) {
    this.history.splice(index, 1);
    localStorage.setItem('olheiro_historico', JSON.stringify(this.history));
  }

  // Redireciona o utilizador de volta para a página de comparação
  verNaArena() {
    this.router.navigate(['/comparar']);
  }

  logout() {
    console.log('A terminar sessão e a limpar dados...');
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}