import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '../pages/interfaces/authLogin.interface';

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router); // Inyectar el Router
  const authState:AuthState = JSON.parse(localStorage.getItem('authState') || 'null');

  if (authState && authState.user) {
    return true;
  } else {
    router.navigate(['/login']); // Redirigir al login si no está autenticado
    return false;
  }
};
