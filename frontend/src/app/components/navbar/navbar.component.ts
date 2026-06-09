import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Importar o RouterLinkActive
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // Adicionar aos imports do componente
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  isLoggedIn = false;
  private sub!: Subscription;

  ngOnInit() {
    // Atualiza a variável quando o utilizador entra ou sai
    this.sub = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    // Evita fugas de memória ao fechar o componente
    if (this.sub) this.sub.unsubscribe();
  }
}