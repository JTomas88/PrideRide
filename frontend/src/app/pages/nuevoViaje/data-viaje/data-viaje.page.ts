import { Component, OnInit, model, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
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

  constructor(private router: Router) {
    this.directionsService = new google.maps.DirectionsService();
    // Escucha los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reiniciarPasos();
      }
    });
  }

  ngOnInit() {
    // this.loadGoogleMapsScript();
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.email);

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      viajeData: { origen: string; destino: string; viajeros: string };
    };

    if (state?.viajeData) {
      this.origen = state.viajeData.origen || 'Sin especificar';
      this.destino = state.viajeData.destino || 'Sin especificar';
      this.viajeros = state.viajeData.viajeros || '1';
      console.log('Datos recibidos:', state.viajeData);
    }
  }

  onTimeChange(event: any) {
    console.log('Hora seleccionada:', event.detail.value);
  }

  loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD2GJTw7EJR95V_4UQj_zIOTHw_RVGvkOM&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Google Maps API loaded');
    };

    script.onerror = (error) => {
      console.error('Error loading Google Maps script:', error);
    };
  }

  buscarRutas(origen: string, destino: string): void {
    this.directionsService.route(
      {
        origin,
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

  onPrimerPasoComplete() {
    this.primer_paso = false;
    this.segundo_paso = true; // Habilita el segundo paso
  }

  onSegundoPasoBack() {
    this.segundo_paso = false;
    this.primer_paso = true; // Vuelve al primer paso
  }

  // Completar el segundo paso
  onSegundoPasoComplete() {
    this.segundo_paso = false;
    this.tercer_paso = true; // Habilita el tercer paso
  }

  // Completar el tercer paso
  onTercerPasoComplete() {
    // Aquí puedes agregar la lógica para finalizar el viaje
    console.log('Viaje completado');
  }

  onTercerPasoBack() {
    this.tercer_paso = false;
    this.segundo_paso = true; // Vuelve al segundo paso
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
