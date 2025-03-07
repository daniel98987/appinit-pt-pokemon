import { Routes } from '@angular/router';
import { AuthComponent } from './auth/pages/auth/auth.component';
import { loginGuard } from './auth/guards/login.guard';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: AuthComponent
        , canActivate: [loginGuard] 
      },
      
 
    {
      path: 'pokemon',
      loadChildren: () =>
          import('./pokeApp/battle.routes')
              .then(m => m.POKEMON_ROUTES)
    , canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '/login' }, // Redirige rutas no encontradas
];
