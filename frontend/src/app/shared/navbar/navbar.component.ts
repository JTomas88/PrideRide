import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, MatIconModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {}


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
}
