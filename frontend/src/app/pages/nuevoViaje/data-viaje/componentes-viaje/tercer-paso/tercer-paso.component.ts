import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastModule } from 'primeng/toast';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tercer-paso',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ToastModule,
    MatIconModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tercer-paso.component.html',
  styleUrls: ['./tercer-paso.component.scss']
})
export class TercerPasoComponent implements OnInit {
  map!: L.Map;
  routeControl: any;
  selectedRouteIndex: number | null = null; // Índice de la ruta seleccionada
  origen: string = '';
  destino: string = '';
  routes: any[] = [];
  sugerenciasParadas: any[] = [];
  paradasSeleccionadas = new Set<string>();
  isLoadingRoutes: boolean = false;
  cargandoSugerencias: boolean = false;
  isUpdatingRoute: boolean = false;
  rutaConParadasSeleccionada: boolean = false;
  marcaPeajes: boolean = false;



  constructor(private travelService: TravelService, private http: HttpClient) {

    /**
     * Definición para los marcadores del mapa
     */
    L.Icon.Default.mergeOptions({
      // iconRetinaUrl: '../../../../../../assets/mapaIcons/marker.png',
      // iconUrl: '../../../../../../assets/mapaIcons/marker.png',
      // shadowUrl: '../../../../../../assets/mapaIcons/marker.png'
    });

  }

  ngOnInit() {
    this.initializeMap();
    this.travelService.viajeData$.subscribe((viajeData) => {
      this.origen = viajeData?.origen || '';
      this.destino = viajeData?.destino || '';
      if (this.origen && this.destino) {
        this.buscarCoordenadas();
      }
    });
  }

  initializeMap() {
    this.map = L.map('map', {
      center: [40.4168, -3.7038],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);
  }

  buscarCoordenadas() {
    this.isLoadingRoutes = true;
    const urlOrigen = `https://nominatim.openstreetmap.org/search?format=json&q=${this.origen}`;
    const urlDestino = `https://nominatim.openstreetmap.org/search?format=json&q=${this.destino}`;

    forkJoin({
      origen: this.http.get<any[]>(urlOrigen),
      destino: this.http.get<any[]>(urlDestino)
    }).subscribe(({ origen, destino }) => {
      if (origen.length === 0 || destino.length === 0) {
        console.error('No se encontraron coordenadas válidas.');
        alert('Direcciones no encontradas.');
        this.isLoadingRoutes = false;
        return;
      }

      const origenCoords = L.latLng(origen[0].lat, origen[0].lon);
      const destinoCoords = L.latLng(destino[0].lat, destino[0].lon);

      console.log('Coordenadas obtenidas:', origenCoords, destinoCoords);
      this.buscarRutas(origenCoords, destinoCoords);
    });

  }

  buscarRutas(origenCoords: L.LatLng, destinoCoords: L.LatLng) {
    console.log('Coordenadas origen:', origenCoords);
    console.log('Coordenadas destino:', destinoCoords);

    // Eliminar ruta anterior si existe
    if (this.routeControl) {
      this.map.removeControl(this.routeControl);
    }

    // Eliminar los marcadores anteriores si existen
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Agregar marcadores de origen y destino
    L.marker(origenCoords).addTo(this.map).bindPopup("Origen").openPopup();
    L.marker(destinoCoords).addTo(this.map).bindPopup("Destino").openPopup();

    // Configurar enrutador OSRM con o sin peajes
    const osrmOptions: any = {
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      profile: 'car',
      steps: true,
      annotations: true,
    };

    if (!this.marcaPeajes) {
      osrmOptions.exclude = 'toll';
    }

    // Definir el control de rutas con el plan personalizado
    this.routeControl = L.Routing.control({
      plan: new L.Routing.Plan([origenCoords, destinoCoords], {
        createMarker: () => false, // 🔥 No mostrar marcadores intermedios
      }),
      routeWhileDragging: false, // Desactiva la actualización en tiempo real
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'car',
      }),
      lineOptions: {
        styles: [{ color: 'blue', weight: 5, opacity: 0.7 }], // Estilos de la ruta
        extendToWaypoints: false, // 🔥 No extender la línea a puntos intermedios
        missingRouteTolerance: 0.001, // Evita errores si faltan partes de la ruta
      },
      show: false, // 🔥 Evita que aparezcan los pasos en el mapa
      showAlternatives: false, // 🔥 No mostrar rutas alternativas
      fitSelectedRoutes: true, // Ajusta el mapa a la ruta
    })
    .on('routesfound', (event: any) => {
      console.log("Rutas encontradas:", event.routes);
      this.routes = event.routes.map((route: any) => ({
        distance: (route.summary.totalDistance / 1000).toFixed(2) + ' km',
        duration: Math.round(route.summary.totalTime / 60) + ' min',
        coordinates: route.coordinates,
      }));
    
      // Seleccionar la primera ruta por defecto
      if (this.routes.length > 0) {
        this.selectedRouteIndex = 0; 
        this.mostrarRutaEnMapa(this.routes[0].coordinates);
      }
    
      this.isLoadingRoutes = false;
    })
      .on('routingerror', (error: any) => {
        console.error("Error al obtener rutas:", error);
        alert("No se pudieron obtener rutas. Intenta con otra dirección.");
        this.isLoadingRoutes = false;
      })
      .addTo(this.map);
  }

  mostrarRutaEnMapa(coordinates: any[]) {
    if (this.routeControl) {
      this.map.removeControl(this.routeControl);
    }
  
    this.routeControl = L.Routing.control({
      waypoints: coordinates.map(coord => L.latLng(coord.lat, coord.lng)),
      routeWhileDragging: false,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'car',
      }),
      lineOptions: {
        styles: [{ color: 'blue', weight: 5, opacity: 0.7 }],
        extendToWaypoints: true, // Asegura que la ruta conecte los waypoints
        missingRouteTolerance: 0.001, // Maneja rutas incompletas sin errores
      },
      fitSelectedRoutes: true,
      show: false,
    }).addTo(this.map);
  }

  
  onPeajeOptionChange(event: any) {
    this.marcaPeajes = event.target.id === 'peajes';
    // Aquí puedes actualizar la lógica de rutas según la opción seleccionada
    if (this.routes.length > 0) {
      this.routes = [];
      this.buscarCoordenadas();
    }
  }

  seleccionarParada(parada: any) {
    if (this.paradasSeleccionadas.has(parada.nombre)) {
      this.paradasSeleccionadas.delete(parada.nombre);
    } else {
      this.paradasSeleccionadas.add(parada.nombre);
    }
  }

  actualizarRuta() {
    // Función para actualizar las rutas cuando se selecciona una parada
    if (this.rutaConParadasSeleccionada) {
      this.isUpdatingRoute = true;
      // Actualizar la lógica de las rutas aquí con las paradas seleccionadas
      this.isUpdatingRoute = false;
    }
  }

  eliminarRutaSeleccionada() {
    this.paradasSeleccionadas.clear();
    this.rutaConParadasSeleccionada = false;
    this.routes = [];
    this.buscarCoordenadas();
  }

  selectRoute(index: number) {
    this.selectedRouteIndex = index;
    const route = this.routes[index];
    if (route) {
      this.mostrarRutaEnMapa(route.coordinates);
    }
  }
  

  // Método para verificar si la ruta está seleccionada
  isRouteSelected(index: number): boolean {
    return this.selectedRouteIndex === index;
  }
}
