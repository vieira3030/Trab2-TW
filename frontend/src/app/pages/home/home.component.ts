import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necessário para o routerLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // Adiciona aqui
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}