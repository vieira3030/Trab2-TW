import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importar o Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css', // ou .scss
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router); // Injetar o Router

  // Processa o registo e redireciona para o login
  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe({
      next: (res) => {
        alert('Sucesso: ' + res.message);
        form.reset();
        this.router.navigate(['/login']); // Redirecionamento automático
      },
      error: (err) => {
        console.error(err); 
        alert(
          'Erro: ' +
            (err.error?.message ||
              'Não foi possível ligar ao servidor. O Rodrigo ligou o backend?')
        );
      },
    });
  }
}