import { Component, inject } from '@angular/core'; // Adicionado o inject
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Adicionado o NgForm
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // Injeção moderna sem usar o construtor
  private authService = inject(AuthService);

  // 'NgForm' remove o erro de "Unexpected any"
  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe({
      next: (res) => {
        alert('Sucesso: ' + res.message);
        form.reset();
      },
      error: (err) => {
        console.error(err); // Isto vai mostrar o erro real na consola (F12)
        alert(
          'Erro: ' +
            (err.error?.message ||
              'Não foi possível ligar ao servidor. O Rodrigo ligou o backend?'),
        );
      },
    });
  }
}
