import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.page.html',
  styleUrls: ['./cookies.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterModule, MatButtonModule, NavbarComponent]
})
export class CookiesPage implements OnInit {
  showPanel = true;
  preferences = {
    analytics: false,
    advertising: false
  };

  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.usuario.email) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
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
