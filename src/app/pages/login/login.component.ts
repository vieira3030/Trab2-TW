import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        // Notifica o estado global de login
        this.authService.setLoggedIn(res.accessToken, res.username);
        alert("Bem-vindo, " + res.username + "!");
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert("Erro no login: " + (err.error.message || "Servidor offline"));
      }
    });
  }
}