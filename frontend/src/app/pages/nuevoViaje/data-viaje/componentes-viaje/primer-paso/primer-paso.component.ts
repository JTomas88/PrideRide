import { Component, OnInit, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeEs);

@Component({
  selector: 'app-primer-paso',
  standalone: true,
  imports: [IonicModule, MatIcon, MatCardModule, MatDatepickerModule],
  providers: [    
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  templateUrl: './primer-paso.component.html',
  styleUrls: ['./primer-paso.component.scss'],
})
export class PrimerPasoComponent  implements OnInit {

  fecha_seleccionada: Date | null = null;
  hora_seleccionada: string | null = null;

  constructor() { }

  ngOnInit() {}


  /**
   * Función para dar formato a la fecha que se selecciona en el calendario.
   * 
   * @returns Devuelve la fecha seleccionada en el formato local (Solo día, mes y año)
   */
  getFormattedDate(): string {
    return this.fecha_seleccionada ? this.fecha_seleccionada.toLocaleDateString() : 'Ninguna fecha seleccionada';
  }

  /**
   * Función para mostrar la hora seleccionada, si la hay.
   * 
   * @returns Devuelve la hora seleccionada
   */
  getTime(): string {
    return this.hora_seleccionada ? this.hora_seleccionada : 'Ninguna hora seleccionada';
  }

  /**
   * Función que recoge la hora seleccionada y le da formato de HH:mm
   * @param event Recoge la hora que se ha seleccionado en el input
   */
  onTimeChange(event: any) {
    const timeValue = new Date(event.detail.value);
    this.hora_seleccionada = timeValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
