import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para os inputs de texto
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importado aqui
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  username = '';
  role = ''; 

  // Variáveis para controlar o modo de edição
  isEditing = false;
  editUsername = '';

  // Lista de funções disponíveis
  funnyRoles = [
    'Olheiro Oficial',
    'Treinador de Bancada',
    'Analista de Sofá',
    'Mister das Táticas',
    'Especialista em Cargas de Ombro',
    'Caça-Talentos (com miopia)'
  ];

  ngOnInit() {
    // Carrega os dados guardados
    this.username = localStorage.getItem('username') || 'Utilizador';
    this.role = localStorage.getItem('role') || 'Olheiro Oficial';
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

  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }
}