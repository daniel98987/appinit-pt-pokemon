import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AuthLogin, AuthState } from '../../interfaces/authLogin.interface';
import { loginSuccess, loginUser } from '../actions/authActions';
import { AlertService } from '../../../../shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class 
AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action:AuthLogin) =>
        this.authService.login(action).pipe(
          map((authData:AuthState) =>{
            localStorage.setItem('authState',JSON.stringify(authData));
            this.alertService.alert('Login correcto', `Bienvenido ${authData.user?.name}!!`,'success');
            
            this.router.navigate(['/pokemon/battle']); 
            return loginSuccess(authData);
          }),
          catchError((error:any) => of(error))
        )
      )
    )
  );


}
