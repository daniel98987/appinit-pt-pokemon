import { createSelector } from '@ngrx/store';
import { AuthState, User } from '../../interfaces/authLogin.interface';
import { AppState } from '../../../../shared/state/app.state';

// Selector padre que obtiene el estado de autenticación
export const authData = (state: AppState) => state.authState;

// Selector hijo que obtiene la propiedad "user" dentro del estado de autenticación
export const selectAuthUser = createSelector(
    authData,
    (authState: AuthState) => authState?.user?.name // Asegura que estás accediendo a la propiedad correcta
);
