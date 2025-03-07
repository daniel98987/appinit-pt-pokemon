import { createAction, props } from '@ngrx/store';
import { AuthLogin, AuthState } from '../../interfaces/authLogin.interface';


export const loginUser = createAction(
  '[Auth] Login User',
  props<AuthLogin>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthState >()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logoutUser = createAction('[Auth] Logout User');
