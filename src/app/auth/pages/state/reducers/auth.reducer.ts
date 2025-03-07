import { createReducer, on } from '@ngrx/store';

import { AuthState } from '../../interfaces/authLogin.interface';
import { loginFailure, loginSuccess, loginUser, logoutUser } from '../actions/authActions';
export const initialState: AuthState = localStorage.getItem('authState') 
  ? JSON.parse(localStorage.getItem('authState')!) 
  : null;

export const authReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loginSuccess, (state, { user,token }) => ({
  ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: null,
    loading:false,
    error:null,
    token:null
  })),
);
