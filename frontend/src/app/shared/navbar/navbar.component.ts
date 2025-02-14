import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/user/usuario.model';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, MatIconModule, TranslateModule, CommonModule, MatDivider, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

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

  validacionHomePage: boolean = true;
  menuOpen = false;

  isMobileWeb: boolean = false;
  isDesktop: boolean = false;
  
  constructor(private router: Router, private platform: Platform, private translate: TranslateService) { }

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
    
    if (this.searchRoute === '/home') {
      this.validacionHomePage = true;
    } else {
      this.validacionHomePage = false;
    }

    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.isLoggedIn = this.userData?.usuario?.email ? true : false;
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
