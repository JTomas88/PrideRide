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
  @Input() backRoute: string | null = null;
  @Input() searchRoute: string | null = '/home';
  @Input() isLoggedIn: boolean = false;
  @Input() isPublishRoute: boolean = false;

  logo: string = '../../../assets/logo/PRIDECAR.png';
  userData: Usuario = {} as Usuario;

  // Variables para el título y el icono dinámico
  dynamicTitle: string = 'Buscar viaje';
  dynamicIcon: string = 'search';

  // Nueva variable para saber si estamos en un navegador o dispositivo móvil
  isMobileWeb: boolean = false;
  isDesktop: boolean = false;

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
    // Verificamos si la aplicación está corriendo en el navegador
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
    this.isLoggedIn = this.userData?.email ? true : false;
  }

  navigateBack() {
    if (this.backRoute) {
      this.router.navigate([this.backRoute]);
    }
  }

  logout() {
    console.log('Cerrar sesión');
  }
}
