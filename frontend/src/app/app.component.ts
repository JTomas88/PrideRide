import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Subscription } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent implements OnInit {
  private consentGivenSubscription!: Subscription;

  constructor(
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService,
    private translate: TranslateService
  ) {
    
    // Establece el idioma predeterminado
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    /**
     * Se obtiene el idioma seleccionado desde la caché.
     */
    const savedLanguage = localStorage.getItem('language');
    const consentStatus = localStorage.getItem('cookieConsentStatus');

    this.ccService.popupOpen$.subscribe(() => {
      console.log('El banner de cookies está visible');
    });

    this.ccService.popupClose$.subscribe(() => {
      console.log('El banner de cookies fue cerrado');
    });

    // Verificar el consentimiento de cookies
    const hasConsent =
      this.cookieService.check('analytics') ||
      this.cookieService.check('advertising');
    if (!hasConsent) {
      console.log('No se han establecido preferencias de cookies.');
    }
    
    if (consentStatus === 'allow' || consentStatus === 'deny') {
      // Si ya se ha dado consentimiento, no mostrar el banner
      this.ccService.destroy();  // Elimina el banner si ya se ha aceptado o rechazado
    } else {
      this.consentGivenSubscription = this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
        const status = event.status;

        localStorage.setItem('cookieConsentStatus', status);

        this.ccService.destroy();
      });
    }

    /**
     * Se comprueba el idioma establecido.
     * Por defecto se establece el idioma castellano,
     * pero si en algún momento el usuario cambia el idioma,
     * recoge el idioma que se ha cambiado de la caché.
     */
    if (savedLanguage) {
      this.translate.use(savedLanguage);
    } else {
      this.translate.setDefaultLang('es');
    }

  }

  ngOnDestroy() {
    if (this.consentGivenSubscription) {
      this.consentGivenSubscription.unsubscribe();
    }
  }

}
