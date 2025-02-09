import { Component, OnInit, model, OnDestroy, ViewChild } from '@angular/core';
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

import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { PrimerPasoComponent } from './componentes-viaje/primer-paso/primer-paso.component';
import { SegundoPasoComponent } from './componentes-viaje/segundo-paso/segundo-paso.component';
import { Usuario } from 'src/app/models/user/usuario.model';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { TravelService } from '../../../core/travel-services/travel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatIcon } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

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
    ToastModule,
    MatIcon,
    NgxSpinnerModule,
  ],
  providers: [provideNativeDateAdapter(), MessageService],
})
export class DataViajePage implements OnInit, OnDestroy {
  selected = model<Date | null>(null);

  mapCenter = { lat: 40.4168, lng: -3.7038 };
  zoom = 12;
  routes: google.maps.DirectionsRoute[] = [];
  selectedRoute: google.maps.DirectionsResult | null = null;

  origen: string = '';
  destino: string = '';
  hora_seleccionada: string = '';
  plazas: string = '';

  primer_paso: boolean = true;
  segundo_paso: boolean = false;
  tercer_paso: boolean = false;

  marcaPeajes: boolean = true;

  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;
  private polyline: google.maps.Polyline | null = null;
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  /**
   * Configuración para mostrar diferentes opciones en el mapa.
   *
   */
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    fullscreenControl: false,
  };
  private destroy$ = new Subject<void>();

  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;
  isLoadingRoutes: boolean = false;

  constructor(
    private router: Router,
    private travelService: TravelService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {
    this.directionsService = new google.maps.DirectionsService();
    // Escucha los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reiniciarPasos();
      }
    });
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#FF0000', // Línea roja
        strokeOpacity: 1.0,
        strokeWeight: 5,
      },
      suppressMarkers: false, // Mostrar los marcadores de inicio y fin
    });
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.usuario.email);

    this.travelService.viajeData$
      .pipe(takeUntil(this.destroy$)) // Elimina la suscripción al salir del componente.
      .subscribe((viajeData) => {
        this.selectedRoute = viajeData?.ruta_seleccionada || null;

        const nuevoOrigen = viajeData?.origen || 'Sin especificar';
        const nuevoDestino = viajeData?.destino || 'Sin especificar';

        /**
         * Hacemos una validación para ejecutar la función solo en caso
         * de que el origen y el destino estén correctos.
         * -----------------------------------------------------------
         */
        if (
          nuevoOrigen !== 'Sin especificar' &&
          nuevoDestino !== 'Sin especificar' &&
          (nuevoOrigen !== this.origen || nuevoDestino !== this.destino)
        ) {
          this.origen = nuevoOrigen;
          this.destino = nuevoDestino;
          this.buscarRutas(this.origen, this.destino);
        }
      });
  }

  ngAfterViewInit() {
    if (this.googleMap?.googleMap) {
      this.directionsRenderer.setMap(this.googleMap.googleMap);
    } else {
      console.error('El mapa aún no está disponible.');
    }
  }

  /**
   * Función para buscar rutas.
   * --------------------------
   * Esta función utiliza un servicio propio de Google: "directionsService"
   * Dicho servicio nos devuelve una lista de rutas que van en función de los parámetros que
   * se le pasan, como pueden ser el origen y el destino.
   *
   * @param origen -> Lugar de origen del viaje
   * @param destino -> Lugar de destino del viaje
   * @returns Devuelve una lista de rutas sugeridas en función del Origen y Destino
   */
  buscarRutas(
    origen: string,
    destino: string,
    evitarPeajes: boolean = false
  ): void {
    this.isLoadingRoutes = true;
    const currentViajeData = this.travelService.getViajeData();
    if (!origen || !destino) {
      console.error('El origen y destino deben estar definidos.');
      return;
    }

    const fechaSalida = currentViajeData.fecha_salida
      ? new Date(currentViajeData.fecha_salida)
      : new Date();

    this.directionsService.route(
      {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        drivingOptions: {
          departureTime: fechaSalida,
          trafficModel: google.maps.TrafficModel.OPTIMISTIC,
        },
        unitSystem: google.maps.UnitSystem.METRIC,
        region: 'ES',
        avoidTolls: evitarPeajes,
      },
      (response, status) => {
        this.isLoadingRoutes = false;
        if (status === google.maps.DirectionsStatus.OK && response) {
          if (response.request.avoidTolls === false) {
            this.marcaPeajes = true;
          } else {
            this.marcaPeajes = false;
          }
          this.routes = response.routes;
          this.directionsRenderer.setDirections(response);

          // this.dibujoLineaEnMapa(this.routes[0]);

          this.selectRoute(0);
        } else {
          console.error('Error al calcular rutas:', status);
          this.routes = [];
        }
      }
    );
  }

  /**
   * Función que muestra en el mapa el recorrido de las rutas
   * Este se muestra con unos estilos configurados en esta función.
   *
   *
   * @param rutasSugeridas -> Rutas que sugiere el servicio de Google
   */
  dibujoLineaEnMapa(route: google.maps.DirectionsRoute) {
    setTimeout(() => {
      if (this.googleMap && this.googleMap.googleMap) {
        /** -> Elimina la línea anterior dibujada en el mapa si existe. */
        if (this.polyline) {
          this.polyline.setMap(null);
        }
        /** -> Se dibuja la nueva línea sobre la que está predefinida por el mapa */
        this.polyline = new google.maps.Polyline({
          path: route.overview_path,
          geodesic: false,
          strokeColor: '#B3B5E6',
          strokeOpacity: 1,
          strokeWeight: 10,
        });
        this.polyline.setMap(this.googleMap.googleMap);
      } else {
        console.error('El mapa aún no está disponible.');
      }
    }, 300);
  }

  /**
   * Función para saber si se está marcando la opción "Con peajes" o "Sin peajes"
   * Cada vez que se cambia la opción se vuelven a buscar las rutas,
   * pero cambiando la opción que incluya los peajes.
   *
   * @param event Información del input seleccionado.
   */
  onPeajeOptionChange(event: any): void {
    const evitarPeajes = event.target.id === 'sinPeajes';
    this.buscarRutas(this.origen, this.destino, evitarPeajes);
    this.routes = [];
  }

  /**
   * Función que se utiliza para seleccionar una ruta
   * de la lista de rutas sugeridas previamente.
   *
   * @param index -> Índice de la ruta seleccionada.
   */
  selectRoute(index: number): void {
    if (!this.routes || this.routes.length === 0) {
      console.error('No hay rutas disponibles.');
      return;
    }

    this.selectedRoute = {
      routes: [this.routes[index]],
      request: {} as google.maps.DirectionsRequest,
    } as google.maps.DirectionsResult;
    this.directionsRenderer.setDirections(this.selectedRoute);

    /**
     * Llamamos a la función "dibujoLineaEnMapa" para volver a
     * construir la línea de la ruta seleccionada.
     *
     */
    // this.dibujoLineaEnMapa(this.routes[index]);

    // Guardar la ruta seleccionada en el servicio
    const viajeData = {
      ...this.travelService.getViajeData(),
      ruta_seleccionada: this.selectedRoute,
    };
    this.travelService.setViajeData(viajeData);
  }

  /**
   * Función para completar el primer paso.
   * Antes de poder continuar, se comprueban los datos almacenados en el servicio.
   *
   * Si los datos están correctamente almacenados se permite continuar al siguiente paso.
   * En caso contrario, lanzamos un mensaje de error informando al usuario de lo ocurrido.
   */
  onPrimerPasoComplete() {
    const currentViajeData = this.travelService.getViajeData();

    if (!currentViajeData?.hora_salida || !currentViajeData?.plazas) {
      this.messageService.add({
        severity: 'error',
        summary: 'Faltan datos',
        detail: 'Por favor, completa todos los campos para continuar.',
        life: 3000,
      });
    } else {
      this.primer_paso = false;
      this.segundo_paso = true;
    }
  }

  /**
   * Permite volver al paso previo
   */
  onSegundoPasoBack() {
    this.segundo_paso = false;
    this.primer_paso = true;
  }

  /**
   * Función para completar el segundo paso.
   * Antes de poder continuar, se comprueban los datos almacenados en el servicio.
   *
   * Si los datos están correctamente almacenados se permite continuar al siguiente paso.
   * En caso contrario, lanzamos un mensaje de error informando al usuario de lo ocurrido.
   */
  onSegundoPasoComplete() {
    const currentViajeData = this.travelService.getViajeData();

    if (!currentViajeData?.origen || !currentViajeData?.destino) {
      this.messageService.add({
        severity: 'error',
        summary: 'Faltan datos',
        detail:
          'Por favor, elige un punto de partida y de llegada para poder continuar.',
        life: 3000,
      });
    } else {
      this.segundo_paso = false;
      this.tercer_paso = true;
    }
  }

  /**
   * Función para completar el tercer paso.
   * Antes de poder continuar, se comprueban los datos almacenados en el servicio.
   *
   * Si los datos están correctamente almacenados se permite continuar al siguiente paso.
   * En caso contrario, lanzamos un mensaje de error informando al usuario de lo ocurrido.
   */
  onTercerPasoComplete() {
    const currentViajeData = this.travelService.getViajeData();

    if (!currentViajeData?.origen || !currentViajeData?.destino) {
      this.messageService.add({
        severity: 'error',
        summary: 'Faltan datos',
        detail: 'Por favor, selecciona una ruta para poder continuar.',
        life: 3000,
      });
    } else {
      this.router.navigate(['/resumen-viaje'], {
        queryParams: currentViajeData,
      });
    }
  }

  /**
   * Permite volver al segundo paso.
   */
  onTercerPasoBack() {
    this.tercer_paso = false;
    this.segundo_paso = true;
  }

  /**
   * Función para reiniciar los pasos para crear un viaje.
   *
   */
  reiniciarPasos() {
    this.primer_paso = true;
    this.segundo_paso = false;
    this.tercer_paso = false;
  }

  /**
   * Función que se ejecuta al salir de este componente.
   * Al ejecutarse, reinicia la información de los pasos para crear un viaje.
   */
  ngOnDestroy() {
    this.reiniciarPasos();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
