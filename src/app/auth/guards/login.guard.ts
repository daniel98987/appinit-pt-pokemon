import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '../pages/interfaces/authLogin.interface';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState:AuthState = JSON.parse(localStorage.getItem('authState') || 'null');

  if (authState && authState.user) {
    router.navigate(['/pokemon/battle']);
    return false;
  }

  return true; 
};
