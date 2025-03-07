import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ROOT_REDUCERS } from './shared/state/app.state';
import { AuthEffects } from './auth/pages/state/effects/auth.effects';
import {provideTranslateService} from "@ngx-translate/core";
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient( withInterceptorsFromDi(),),
    provideEffects(AuthEffects),
    provideStore(ROOT_REDUCERS), // Registra los reducers de la aplicación

    provideTranslateService({
      defaultLanguage: 'en'
     }),
     { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }, // Asegúrate de que está aquí
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
