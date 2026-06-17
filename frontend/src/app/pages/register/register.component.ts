import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // 1. Importar o RouterModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  // 2. Adicionar o RouterModule aos imports do componente
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css', 
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router); 

  // Processa o registo e redireciona para o login
  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe({
      next: (res) => {
        alert('Sucesso: ' + res.message);
        form.reset();
        
        // Navega para o login sem recarregar a página
        this.router.navigate(['/login']); 
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