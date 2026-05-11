import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Eduardo, verifica este caminho!
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // O segredo está aqui: injetar o serviço e o router
  constructor(private authService: AuthService, private router: Router) {}

  // ESTA É A FUNÇÃO QUE ESTÁ A FALTAR NO TEU ERRO:
  onSubmit(form: any) {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken);
        alert("Bem-vindo, " + res.username + "!");
        this.router.navigate(['/']); // Redireciona para a home
      },
      error: (err) => {
        alert("Erro no login: " + (err.error.message || "Servidor offline"));
      }
    });
  }
}