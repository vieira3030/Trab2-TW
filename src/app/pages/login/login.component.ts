import { Component, inject } from '@angular/core'; // Adicionado o inject
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Adicionado o NgForm
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
  // O Linter prefere esta forma moderna de injetar serviços
  private authService = inject(AuthService);
  private router = inject(Router);

  // Substituímos 'any' por 'NgForm' para tipagem correta
  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken);
        alert("Bem-vindo, " + res.username + "!");
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert("Erro no login: " + (err.error.message || "Servidor offline"));
      }
    });
  }
}