import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router'; // Adicionado withHashLocation
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // Ativa o routing com cardinal (#) para evitar o erro 404 no GitHub Pages
    provideRouter(routes, withHashLocation()), 
    
    // Liga o interceptor de segurança
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};