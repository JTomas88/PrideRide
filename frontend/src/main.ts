import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent, HttpLoaderFactory } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { FormsModule } from '@angular/forms';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: '',
  },
  position: 'bottom',
  theme: 'block',
  palette: {
    popup: {
      background: '#000',
      text: '#fff',
    },
    button: {
      background: '#f1d600',
      text: '#000',
    },
  },
  type: 'opt-in',
  content: {
    message:
      'PrideRide utiliza cookies propias con el objetivo de optimizar su visita.',
    allow: 'Aceptar',
    deny: 'Rechazar',
    link: 'Cookies.',
    href: '/cookies',
    policy: 'Política de cookies.',
  },
  elements: {
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">
      {{message}}
      <a aria-label="Leer mas sobre los términos del servicio" tabindex="2" class="cc-link" href="{{href}}" target="_blank" rel="noopener">{{link}}</a>
    </span>
    `,
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    importProvidersFrom(
      FormsModule,
      NgcCookieConsentModule.forRoot(cookieConfig),
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
});
