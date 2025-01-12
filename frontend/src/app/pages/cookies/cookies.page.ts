import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.page.html',
  styleUrls: ['./cookies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, RouterModule, MatIcon, MatButtonModule]
})
export class CookiesPage implements OnInit {
  showPanel = true;
  preferences = {
    analytics: false,
    advertising: false
  };


  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  savePreferences() {
    // Guardar preferencias en cookies
    this.cookieService.set('analytics', String(this.preferences.analytics), 365);
    this.cookieService.set('advertising', String(this.preferences.advertising), 365);

    // Cerrar el panel
    this.showPanel = false;
  }

  rejectAll() {
    // Rechazar todas menos esenciales
    this.preferences.analytics = false;
    this.preferences.advertising = false;

    // Guardar las preferencias
    this.savePreferences();
  }
}
