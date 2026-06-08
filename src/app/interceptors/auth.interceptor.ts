import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Se houver um token, clona o pedido e adiciona o cabeçalho
  if (token) {
    req = req.clone({
      setHeaders: {
        'x-access-token': token // Este é o nome que definiste no backend
      }
    });
  }

  return next(req);
};