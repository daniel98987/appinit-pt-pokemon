import { Component, inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spineer',
  imports:[CommonModule],
  template: `
  <div class="overlay" *ngIf="isLoading | async">
        <div class="loadingio-spinner-rolling-zvsd6sfg6e"><div class="ldio-ije64jmhzm">
        <div></div>
        </div></div>
  </div>
  `,
  styleUrls: ['./spineer.component.css'],
})
export class SpineerComponent   {
  loadingService = inject(LoadingService);
  isLoading!:Subject<boolean>;
  ngOnInit(): void {
    
   this.isLoading=this.loadingService.isLoading;
  }
}
