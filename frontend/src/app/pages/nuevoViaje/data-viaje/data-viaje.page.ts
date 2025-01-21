import { Component, OnInit, model, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JumbotronComponent } from '../../jumbotron/jumbotron.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { GoogleMapsModule } from '@angular/google-maps';
import { PrimerPasoComponent } from './componentes-viaje/primer-paso/primer-paso.component';
import { SegundoPasoComponent } from './componentes-viaje/segundo-paso/segundo-paso.component';
import { Usuario } from 'src/app/models/user/usuario.model';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { TravelService } from '../../../core/travel-services/travel.service';

@Component({
  selector: 'app-data-viaje',
  templateUrl: './data-viaje.page.html',
  styleUrls: ['./data-viaje.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatCardModule,
    JumbotronComponent,
    MatInputModule,
    MatFormFieldModule,
    GoogleMapsModule,
    MatButtonModule,
    PrimerPasoComponent,
    SegundoPasoComponent,
    PagesnavbarComponent,
    PagesnavbarComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class DataViajePage implements OnInit, OnDestroy {
  selected = model<Date | null>(null);

  mapCenter = { lat: 40.4168, lng: -3.7038 }; // Ejemplo: Madrid
  zoom = 12;
  routes: google.maps.DirectionsRoute[] = [];
  selectedRoute: google.maps.DirectionsResult | null = null;

  origen: string = '';
  destino: string = '';
  viajeros: string = '';

  primer_paso: boolean = true;
  segundo_paso: boolean = false;
  tercer_paso: boolean = false;

  private directionsService: google.maps.DirectionsService;

  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor(private router: Router, private travelService: TravelService) {
    this.directionsService = new google.maps.DirectionsService();
    // Escucha los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reiniciarPasos();
      }
    });
  }

  ngOnInit() {
    this.loadGoogleMapsScript();
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.email);

    const viajeData = this.travelService.getViajeData();

    if (viajeData) {
      this.origen = viajeData.origen || 'Sin especificar';
      this.destino = viajeData.destino || 'Sin especificar';
      this.viajeros = viajeData.viajeros || '1';
      console.log('Datos recibidos:', viajeData);
    }

    if (
      this.origen &&
      this.destino &&
      this.origen !== 'Sin especificar' &&
      this.destino !== 'Sin especificar'
    ) {
      this.buscarRutas(this.origen, this.destino);
    }
  }

  onTimeChange(event: any) {
    console.log('Hora seleccionada:', event.detail.value);
    this.userLoggedIn = !!(this.userData && this.userData.email);
  }

  loadGoogleMapsScript() {
    const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD2GJTw7EJR95V_4UQj_zIOTHw_RVGvkOM&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onerror = (error) => {
      console.error('Error loading Google Maps script:', error);
    };
  }

  buscarRutas(origen: string, destino: string): void {
    if (!origen || !destino) {
      console.error('El origen y destino deben estar definidos.');
      return;
    }

    this.directionsService.route(
      {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          this.routes = response.routes;
          this.selectRoute(0); // Selecciona la primera ruta por defecto
        } else {
          console.error('Error al calcular rutas:', status);
        }
      }
    );
  }

  selectRoute(index: number): void {
    this.selectedRoute = {
      routes: [this.routes[index]],
      request: {},
    } as google.maps.DirectionsResult;
  }

  /**
   * Función para completar el primer paso
   * y permitir ir al segundo
   */
  onPrimerPasoComplete() {
    this.primer_paso = false;
    this.segundo_paso = true;
  }

  /**
   * Permite volver al paso previo
   */
  onSegundoPasoBack() {
    this.segundo_paso = false;
    this.primer_paso = true;
  }

  // Completa el segundo paso
  onSegundoPasoComplete() {
    this.segundo_paso = false;
    this.tercer_paso = true;
  }

  // Completa el tercer paso
  onTercerPasoComplete() {
    // Aquí puedes agregar la lógica para finalizar el viaje
    console.log('Viaje completado');
  }

  /**
   * Permite volver al segundo paso.
   */
  onTercerPasoBack() {
    this.tercer_paso = false;
    this.segundo_paso = true;
  }

  reiniciarPasos() {
    this.primer_paso = true;
    this.segundo_paso = false;
    this.tercer_paso = false;
  }

  ngOnDestroy() {
    this.reiniciarPasos();
  }
}
