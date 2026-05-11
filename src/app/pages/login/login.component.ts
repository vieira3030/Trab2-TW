// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para lógica de templates
import { FormsModule } from '@angular/forms';   // Necessário para formulários

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adiciona ambos aqui
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // A lógica de enviar os dados para o Rodrigo será feita na Issue #4
}