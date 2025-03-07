import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import translationsEN from "../assets/i18n/en.json";
import translationsES from "../assets/i18n/es.json";
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
  TranslateModule
} from "@ngx-translate/core";
import { SpineerComponent } from './shared/spineer/spineer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,TranslateModule,SpineerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   translate = inject( TranslateService);
  constructor() {
    this.translate.setTranslation('es', translationsES);
    this.translate.setDefaultLang('es');
  }

  changeLenguage(lang: string) {

    if (lang=='en') {
      this.translate.setTranslation(lang, translationsEN);
    }else{
      this.translate.setTranslation(lang, translationsES);

    }
    this.translate.setDefaultLang(lang);
  }
}
