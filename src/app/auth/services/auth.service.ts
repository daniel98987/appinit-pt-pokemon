import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin, AuthState } from '../pages/interfaces/authLogin.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://run.mocky.io/v3/edf6c3d5-fcdf-4185-b2c2-1587cdb8d31f'; 

  httpClient = inject(HttpClient);

  login(credentials:AuthLogin): Observable<any> {
    return this.httpClient.post<AuthState>(this.apiUrl, credentials);
  }
}
