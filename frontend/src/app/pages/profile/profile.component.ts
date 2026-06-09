import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Confirma se o caminho está correto!

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  // Variáveis vazias que vão ser preenchidas com dados reais
  username: string = '';
  role: string = '';
  isEditing: boolean = false;
  history: any[] = [];

  // Injetar os serviços necessários
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // 1. CARREGAR PERFIL: Vai buscar à memória (ou base de dados)
    this.username = localStorage.getItem('olheiro_username') || 'vieira3030';
    this.role = localStorage.getItem('olheiro_role') || 'Caça-Talentos (com miopia)';

    // 2. CARREGAR HISTÓRICO: Vai procurar as comparações reais que guardaste noutra página
    const historicoGuardado = localStorage.getItem('olheiro_historico');
    if (historicoGuardado) {
      this.history = JSON.parse(historicoGuardado); // Carrega o que lá estiver
    } else {
      this.history = []; // Fica vazio e mostra a mensagem "Ainda não tens comparações"
    }
  }

  // 3. EDITAR E GUARDAR PERFIL
  toggleEdit() {
    this.isEditing = !this.isEditing; // Alterna entre bloquear e desbloquear
    
    if (!this.isEditing) {
      // Quando clicas em "Guardar Alterações" (isEditing passa a false)
      console.log('A guardar novos dados:', this.username, this.role);
      
      // Guarda na memória do browser
      localStorage.setItem('olheiro_username', this.username);
      localStorage.setItem('olheiro_role', this.role);
      
      // NOTA: Se tiveres backend, deverias chamar aqui algo como:
      // this.authService.updateUser(this.username, this.role).subscribe(...);
    }
  }

  // Termina a sessão e limpa a memória
  logout() {
    console.log('A terminar sessão e a limpar dados...');
    
    // Apaga o token e os dados do utilizador do browser
    localStorage.clear(); 
    
    // Redireciona para a página de login (ajusta '/login' se a tua rota for diferente)
    this.router.navigate(['/login']); 
  }
}