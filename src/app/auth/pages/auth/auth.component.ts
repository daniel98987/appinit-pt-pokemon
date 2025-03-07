import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginUser } from '../state/actions/authActions';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  hidePassword = true; 
  private store = inject(Store<any>)
  loginForm = new FormGroup({
    email: new FormControl('dzambrano863@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12312312312', [Validators.required, Validators.minLength(6)])
  });
 

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        
        loginUser({
         email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      })
    
    
    
    );
    } 
  }
}
