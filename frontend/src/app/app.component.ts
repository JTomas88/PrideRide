import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    this.ccService.popupOpen$.subscribe(() => {
      console.log('El banner de cookies está visible');
    });

    this.ccService.popupClose$.subscribe(() => {
      console.log('El banner de cookies fue cerrado');
    });

    const hasConsent =
      this.cookieService.check('analytics') ||
      this.cookieService.check('advertising');
    if (!hasConsent) {
      // Mostrar el panel si no hay preferencias guardadas
      console.log('No se han establecido preferencias de cookies.');
    }
  }
}
