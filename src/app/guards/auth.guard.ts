import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Verifica se existe sessão válida antes de abrir a página
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Verifica na memória do browser se o token existe
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true; // Permite o acesso
  }

  // Bloqueia o acesso e reencaminha para a página de login
  router.navigate(['/login']);
  return false;
};