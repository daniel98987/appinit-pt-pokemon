import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
// import { selectAuthUser } from '../../auth/pages/state/selector/auth.selectors';
import { CommonModule } from '@angular/common';
import { selectAuthUser } from '../../auth/pages/state/selector/auth.selectors';
import { logoutUser } from '../../auth/pages/state/actions/authActions';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,MatInputModule,MatSelectModule,MatFormFieldModule,FormsModule,
    ReactiveFormsModule,MatIconModule,MatButtonModule,CommonModule,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  alertService = inject(AlertService)
  router = inject(Router)
logout() {
  this.alertService.confirmAlert('Logout','¿Desea salir de la aplicación?').then(res=>{
    if (res) {
      localStorage.removeItem('authState');
      this.router.navigate(['/login']); 
        this.store.dispatch(logoutUser())
    }
  })

    
}


  lenguage = new FormControl('es');
  @Output() lenguageEmiiter = new EventEmitter<string>();
  lenguages: any[] = [
    {value: 'es', viewValue: 'Español'},
    {value: 'en', viewValue: 'Ingles'},
  ];
  user$: Observable<any> = new Observable()

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {

 this.user$ = this.store.select(selectAuthUser)

    this.lenguage.valueChanges.subscribe(value => {
      this.lenguageEmiiter.emit(value||'');
    })
  }
}