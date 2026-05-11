import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para o *ngIf funcionar
import { FormsModule } from '@angular/forms';   // Para o ngModel funcionar

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // ESTA LINHA É A MAIS IMPORTANTE
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: any) {
    this.authService.register(form.value).subscribe({
      next: (res) => {
        alert("Sucesso: " + res.message);
        form.reset();
      },
      error: (err) => alert("Erro: " + err.error.message)
    });
  }
}