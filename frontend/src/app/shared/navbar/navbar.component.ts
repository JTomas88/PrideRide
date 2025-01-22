import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/user/usuario.model';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, MatIconModule, TranslateModule, CommonModule, MatDivider],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  userData: Usuario = {} as Usuario;
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.email) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }


  /**
   * Función para realizar el cambio de idiomas de la aplicación.
   * Al seleccionar un idioma, guarda la selección en la caché del navegador
   * para poder así mantener el idioma seleccionado durante la navegación.
   * 
   * @param lang Recibe el idioma seleccionado en el selector de idiomas.
   */
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {
    localStorage.removeItem('userData');
    window.location.reload();
  }
}
