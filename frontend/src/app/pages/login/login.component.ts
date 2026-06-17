import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// 1. Importa o RouterModule para usar navegação interna sem recarregar
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // 2. Adiciona o RouterModule aos imports do componente
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Processa os dados do formulário ao clicar em Entrar
  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        // Notifica o estado global de login e guarda o token
        this.authService.setLoggedIn(res.accessToken, res.username);
        alert("Bem-vindo, " + res.username + "!");
        
        // Redireciona para a página inicial após sucesso
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Alerta o utilizador caso a password esteja errada ou a API desligada
        alert("Erro no login: " + (err.error.message || "Servidor offline"));
      }
    });
  }
}