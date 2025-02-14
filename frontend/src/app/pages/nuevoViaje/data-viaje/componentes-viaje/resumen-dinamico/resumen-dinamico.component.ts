import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { GoogleServices } from 'src/app/core/google-services/google-services.service';
import { TravelService } from 'src/app/core/travel-services/travel.service';

@Component({
  selector: 'app-resumen-dinamico',
  standalone: true,
  imports: [MatIconModule, IonicModule, MatButtonModule, CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './resumen-dinamico.component.html',
  styleUrls: ['./resumen-dinamico.component.scss'],
})
export class ResumenDinamicoComponent implements OnInit {

  currentViajeData: any;
  private destroy$ = new Subject<void>();
  editandoViaje: boolean = false;

  origen: string = '';
  destino: string = '';
  hora_seleccionada: string = '';
  plazas: string = '';
  // selectedRoute: google.maps.DirectionsResult | null = null;

  copiaViajeData: any = {};

  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  constructor(private travelService: TravelService, private googleService: GoogleServices) { }

  ngOnInit() {
    this.actualizarInformacion();
  }

  /**
   * Función para actualizar los datos del viaje
   */
  actualizarInformacion() {
    this.travelService.viajeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((viajeData) => {
        this.currentViajeData = viajeData ?? {};
        this.origen = this.currentViajeData?.origen || '';
        // this.selectedRoute = this.currentViajeData?.ruta_seleccionada || null;
      });
  }

  /**
   * Función para obtener la fecha que ha seleccionado el usuario 
   * y darle un formato.
   * 
   * @returns Devuelve la fecha formateada si la hay, si no, devuelve un string vacío.
   */
  getFormattedDate(): string {
    if (this.currentViajeData?.fecha_salida) {
      const date = new Date(this.currentViajeData?.fecha_salida);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    }
    return '';
  }

  toggleEditarViaje() {
    this.editandoViaje = true;
    this.copiaViajeData = JSON.parse(JSON.stringify(this.currentViajeData));
  }

  /**
   * Función para guardar de forma temporal los datos del viaje.
   */
  guardarCambios() {
    this.editandoViaje = false;
    this.actualizarInformacion();
  }

  /**
   * Función para cancelar la edición del viaje que se está creando.
   */
  cancelarEdicion() {
    this.currentViajeData = JSON.parse(JSON.stringify(this.copiaViajeData));
    this.editandoViaje = false;
  }

  obtenerSugerenciasOrigen(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasOrigen = respuesta;
      });
  }

  obtenerSugerenciasDestino(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasDestino = respuesta;
      });
  }

  seleccionarLocalidadOrigen(localidad: any) {
    this.origen = localidad.descripcion.split(',')[0].trim();
    const viajeData = {
      ...this.travelService.getViajeData(),
      origen: this.origen,
    };
    this.travelService.setViajeData(viajeData);
    this.sugerenciasOrigen = [];
  }


  seleccionarLocalidadDestino(localidad: any) {
    this.destino = localidad.descripcion.split(',')[0].trim();
    const viajeData = {
      ...this.travelService.getViajeData(),
      destino: this.destino,
    };
    this.travelService.setViajeData(viajeData);
    this.sugerenciasDestino = [];
  }


}
