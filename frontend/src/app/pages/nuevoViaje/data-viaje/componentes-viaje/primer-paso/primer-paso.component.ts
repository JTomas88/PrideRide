import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { TravelService } from 'src/app/core/travel-services/travel.service';

registerLocaleData(localeEs);

@Component({
  selector: 'app-primer-paso',
  standalone: true,
  imports: [IonicModule, MatIcon, MatCardModule, MatDatepickerModule, FormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  templateUrl: './primer-paso.component.html',
  styleUrls: ['./primer-paso.component.scss'],
})
export class PrimerPasoComponent implements OnInit {
  fecha_seleccionada: string | null = null;
  hora_seleccionada: string | null = null;

  origen: string = '';
  destino: string = '';
  viajeros: string = '';
  hora_salida: string = '';
  plazas: string = '';

  constructor(private travelService: TravelService) {}

  ngOnInit() {
    const date = new Date();

    this.fecha_seleccionada = date.toISOString();
    this.hora_seleccionada = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const viajeData = this.travelService.getViajeData();

    if (viajeData) {
      this.viajeros = viajeData.viajeros || '0';
    }
  }

  /**
   * Función para obtener la fecha actual y darle un formato específico.
   * 
   * @returns Si hay una fecha seleccionada la devuelve en el formato configurado,
   * en el caso de no tener una fecha seleccionada devuelve el string.
   */
  getFormattedDate(): string {
    if (this.fecha_seleccionada) {
      const date = new Date(this.fecha_seleccionada);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    }
    return 'Ninguna fecha seleccionada.';
  }

  /**
   * Función para obtener la hora actual.
   * 
   * @returns Devuelve la hora seleccionada.
   */
  getTime(): string {
    return this.hora_seleccionada ? this.hora_seleccionada : 'Ninguna hora seleccionada.';
  }

  onDateChange(event: any) {
    this.fecha_seleccionada = event.detail.value;
  }

  /**
   * Función para seleccionar la hora.
   * ---------------------------------
   * -> En esta función debemos mantener los datos previos
   *    que hubiera en el servicio del viaje.
   * 
   * -> En primer lugar obtenemos la información que hubiera guardada previamente para el viaje.
   * -> Cuando la tenemos, actualizamos la hora que ha seleccionado el usuario.
   * -> En un tercer paso, guardamos la hora seleccionada en el servicio pero teniendo en cuenta
   *    que hay que mantener los datos que hubiera previamente.
   * -> Como último paso, se guarda toda la información en el servicio de los viajes.
   * 
   * @param event -> Recibe la información del evento en el input de la selección de hora.
   */
  onTimeChange(event: any) {
    const currentViajeData = this.travelService.getViajeData() || {};
  
    const timeValue = new Date(event.detail.value);
    this.hora_seleccionada = timeValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const viajeData = {
      ...currentViajeData,
      hora_salida: this.hora_seleccionada,
    };
  
    this.travelService.setViajeData(viajeData);
  }
}
