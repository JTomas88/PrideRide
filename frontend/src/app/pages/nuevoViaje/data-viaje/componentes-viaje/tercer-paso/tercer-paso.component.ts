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

  constructor(private travelService: TravelService, private http: HttpClient) { }

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
      center: [40.4168, -3.7038], // Madrid as default
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
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
      if (origen.length > 0 && destino.length > 0) {
        const origenCoords = L.latLng(origen[0].lat, origen[0].lon);
        const destinoCoords = L.latLng(destino[0].lat, destino[0].lon);
        this.buscarRutas(origenCoords, destinoCoords);
      }
    });
  }

  buscarRutas(origenCoords: L.LatLng, destinoCoords: L.LatLng) {
    console.log('Coordenadas origen:', origenCoords);
    console.log('Coordenadas destino:', destinoCoords);
    if (this.routeControl) {
      this.map.removeControl(this.routeControl);
    }

    this.routeControl = L.Routing.control({
      waypoints: [origenCoords, destinoCoords],
      routeWhileDragging: true,
      show: false,
      router: new L.Routing.OSRMv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/driving/${origenCoords.lng},${origenCoords.lat};${destinoCoords.lng},${destinoCoords.lat}?overview=false&alternatives=true&steps=true&hints=;`
      })
    })
      .on('routesfound', (e: any) => {
        if (e.routes.length > 0) {
          this.routes = e.routes;
          this.isLoadingRoutes = false;
        } else {
          console.error('No se encontraron rutas');
          this.isLoadingRoutes = false;
          alert('No se encontraron rutas entre los puntos seleccionados.');
        }
      })
      .on('routingerror', (error: any) => {
        console.error('Error al calcular rutas:', error);
        this.isLoadingRoutes = false;
        alert('Hubo un problema al calcular las rutas.');
      })
      .addTo(this.map);
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
      const waypoints = route.coordinates.map((coord: any) => L.latLng(coord[1], coord[0]));
      this.routeControl.setWaypoints(waypoints);
    }
  }

  // Método para verificar si la ruta está seleccionada
  isRouteSelected(index: number): boolean {
    return this.selectedRouteIndex === index;
  }
}
