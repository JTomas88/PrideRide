import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular'; // Importamos Platform
import { TranslateModule } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-pagesnavbar',
  standalone: true,
  imports: [IonicModule, MatIcon, CommonModule, RouterLink, MatDivider, TranslateModule],
  templateUrl: './pagesnavbar.component.html',
  styleUrls: ['./pagesnavbar.component.scss'],
})
export class PagesnavbarComponent implements OnInit {
  /**
   * Variables que van a recibir información de otros componentes
   * mediante la anotación "Input()"
   */
  @Input() backRoute: string | null = null;
  @Input() searchRoute: string | null = '/home';
  @Input() isLoggedIn: boolean = false;
  @Input() isPublishRoute: boolean = false;

  logo: string = '../../../assets/logo/PRIDECAR.png';
  userData: Usuario = {} as Usuario;

  /**
   * Variables para el título y el icono dinámicos.
   * Por defecto muestran "Buscar viaje" si no se le pasa ninguna información
   */
  dynamicTitle: string = 'Buscar viaje';
  dynamicIcon: string = 'search';

  isMobileWeb: boolean = false;
  isDesktop: boolean = false;

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
    /**
     * Comprobación para saber si la aplicación está ejecutándose en navegador(PC) o móvil.
     */
    this.isMobileWeb = this.platform.is('mobileweb');
    this.isDesktop = this.platform.is('desktop');
    
    if(this.searchRoute === 'search') {
      this.searchRoute = '/busqueda-viajes';
      this.dynamicTitle = 'Buscar viaje';
      this.dynamicIcon = 'search';
    } else if(this.searchRoute === 'newTravel') {
      this.searchRoute = '/nuevo-viaje';
      this.dynamicTitle = 'Publicar viaje';
      this.dynamicIcon = 'add';
    }

    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.isLoggedIn = this.userData?.usuario.email ? true : false;
  }

  /**
   * Función para volver atrás en la aplicación.
   */
  navigateBack() {
    if (this.backRoute) {
      this.router.navigate([this.backRoute]);
    }
  }

  /**
   * Función para cerrar la sesión.
   */
  logout() {
    localStorage.removeItem('userData');
    window.location.reload();
  }
}
