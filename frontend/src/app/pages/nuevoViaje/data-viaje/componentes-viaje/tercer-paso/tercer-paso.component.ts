import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ToastModule } from 'primeng/toast';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tercer-paso',
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    GoogleMapsModule,
    MatButtonModule,
    ToastModule,
    MatIconModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tercer-paso.component.html',
  styleUrls: ['./tercer-paso.component.scss'],
})
export class TercerPasoComponent implements OnInit {

  clickMapaParada: boolean = true;
  mapCenter = { lat: 40.4168, lng: -3.7038 };
  zoom = 12;
  routes: google.maps.DirectionsRoute[] = [];
  selectedRoute: google.maps.DirectionsResult | null = null;

  origen: string = '';
  destino: string = '';
  hora_seleccionada: string = '';
  plazas: string = '';

  marcaPeajes: boolean = true;
  waypoints: google.maps.DirectionsWaypoint[] = [];

  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;
  private polyline: google.maps.Polyline | null = null;
  private destroy$ = new Subject<void>();

  sugerenciasParadas: any[] = [];

  segundo_paso: boolean = false;
  tercer_paso: boolean = false;
  isLoadingRoutes = false;
  rutaConParadasSeleccionada = false;
  isUpdatingRoute = false;

  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  currentViajeData: any;

  /**
   * Configuración para mostrar diferentes opciones en el mapa.
   *
   */
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    fullscreenControl: false,
  };

  constructor(private router: Router,
    private travelService: TravelService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService) {
    this.directionsService = new google.maps.DirectionsService();


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
    this.travelService.viajeData$
      .pipe(takeUntil(this.destroy$)) // Elimina la suscripción al salir del componente.
      .subscribe((viajeData) => {
        this.selectedRoute = viajeData?.ruta_seleccionada || null;
        this.currentViajeData = viajeData;
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
    setTimeout(() => {
      if (this.googleMap?.googleMap) {
        this.directionsRenderer.setMap(this.googleMap.googleMap);
      } else {
        console.error('El mapa aún no está disponible.');
      }
    }, 500);
  }

  /**
   * Permite volver al segundo paso.
   */
  onTercerPasoBack() {
    this.tercer_paso = false;
    this.segundo_paso = true;
  }

  onTercerPasoComplete() {
    const currentViajeData = this.travelService.getViajeData();

    if (!currentViajeData?.origen || !currentViajeData?.destino) {
      this.messageService.add({
        severity: 'error',
        summary: 'Faltan datos',
        detail: 'Por favor, selecciona una ruta para poder continuar.',
        life: 3000
      });
    } else {
      this.router.navigate(['/resumen-viaje'], {
        queryParams: currentViajeData
      });
    }
    this.tercer_paso = false;
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
    this.spinner.show();
    setTimeout(() => {
      const currentViajeData = this.travelService.getViajeData();
      if (!origen || !destino) {
        console.error('El origen y destino deben estar definidos.');
        return;
      }

      if (!this.googleMap?.googleMap) {
        console.error("El mapa aún no está disponible.");
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
          this.spinner.hide();
          if (status === 'OK' && response) {
            if (response.request.avoidTolls === false) {
              this.marcaPeajes = true;
            } else {
              this.marcaPeajes = false;
            }
            this.routes = response.routes;
            this.directionsRenderer.setDirections(response);
            this.sugerenciasParadas = [];

            this.dibujoLineaEnMapa(this.routes[0]);
          } else {
            console.error('Error al calcular rutas:', status);
            this.routes = [];
          }
        }
      );
    }, 2000)
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
   * Función para actualizar la ruta cuando se añade una parada.
   * 
   * @returns Devuelve la ruta personalizada
   */
  actualizarRuta() {
    if (!this.origen || !this.destino) {
      console.error("El origen y destino deben estar definidos.");
      return;
    }

    this.isLoadingRoutes = true;

    this.directionsService.route(
      {
        origin: this.origen,
        destination: this.destino,
        waypoints: this.waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (response, status) => {
        this.isLoadingRoutes = false;

        if (status === "OK" && response) {
          this.routes = response.routes;
          this.selectedRoute = response;
          this.directionsRenderer.setDirections(response);

          this.rutaConParadasSeleccionada = true;
          this.obtenerSugerenciasParadas();
          this.dibujoLineaEnMapa(this.routes[0]);
          // Guardar solo la ruta con paradas
          localStorage.setItem('rutaConParadas', JSON.stringify({
            origen: this.origen,
            destino: this.destino,
            waypoints: this.waypoints,
            selectedRoute: response
          }));
        } else {
          console.error("Error al actualizar la ruta:", status);
        }
      }
    );
  }


  obtenerSugerenciasParadas() {
    // Simulación de sugerencias basadas en la ruta seleccionada
    this.sugerenciasParadas = [
      { nombre: 'Área de Servicio A', distancia: '20km' },
      { nombre: 'Gasolinera B', distancia: '45km' },
      { nombre: 'Restaurante C', distancia: '75km' }
    ];
  }


  seleccionarParada(parada: any) {
    console.log('Parada seleccionada:', parada);
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
    this.rutaConParadasSeleccionada = true;
    /**
     * Llamamos a la función "dibujoLineaEnMapa" para volver a
     * construir la línea de la ruta seleccionada.
     *
     */
    this.dibujoLineaEnMapa(this.routes[index]);

    // Guardar la ruta seleccionada en el servicio
    const viajeData = {
      ...this.travelService.getViajeData(),
      ruta_seleccionada: this.selectedRoute,
    };
    this.travelService.setViajeData(viajeData);
    // this.isLoadingRoutes = true;
    this.actualizarRuta();
    this.obtenerSugerenciasParadas()
  }


}
