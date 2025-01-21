import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleServices } from 'src/app/core/google-services/google-services.service';
import { TravelService } from 'src/app/core/travel-services/travel.service';

@Component({
  selector: 'app-segundo-paso',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './segundo-paso.component.html',
  styleUrls: ['./segundo-paso.component.scss'],
})
export class SegundoPasoComponent implements OnInit {

  origen: string = '';
  destino: string = '';
  plazas: string = '';
  hora_seleccionada: string = '';

  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  currentViajeData: any;

  constructor(private travelService: TravelService, private googleService: GoogleServices) { }

  ngOnInit() {
    const currentViajeData = this.travelService.getViajeData();
    this.origen = currentViajeData.origen || '';
    this.destino = currentViajeData.destino || '';
    this.plazas = currentViajeData.plazas || '';
    this.hora_seleccionada = currentViajeData.hora_salida || '';
  }

  /**
 * Función para obtener la lista de sugerencias para el origen
 * en función de lo que escriba el usuario en el input correspondiente.
 * 
 * @param evento Recibe el evento del input.
 */
  obtenerSugerenciasOrigen(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasOrigen = respuesta;
      });
  }

  /**
  * Función para obtener la lista de sugerencias para el destino
  * en función de lo que escriba el usuario en el input correspondiente.
  * 
  * @param evento Recibe el evento del input.
  */
  obtenerSugerenciasDestino(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasDestino = respuesta;
      });
  }

  /**
   * Función para guardar la información de la localidad de origen seleccionada.
   * 
   * @param localidad -> Recibe la localidad seleccionada en la lista de sugerencias.
   */
  seleccionarLocalidadOrigen(localidad: any) {
    this.origen = localidad.descripcion.split(',')[0].trim();
    const viajeData = {
      ...this.travelService.getViajeData(),
      origen: this.origen,
    };
    this.travelService.setViajeData(viajeData);
    this.sugerenciasOrigen = [];
  }


  /**
   * Función para guardar la información de la localidad de destino seleccionada.
   * 
   * @param localidad -> Recibe la localidad seleccionada en la lista de sugerencias.
   */
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
