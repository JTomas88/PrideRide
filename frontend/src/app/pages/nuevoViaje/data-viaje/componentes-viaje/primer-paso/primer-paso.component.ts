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

  selected: Date | null = null;

  constructor() { }

  ngOnInit() {}


  /**
   * Función para dar formato a la fecha que se selecciona en el calendario.
   * 
   * @returns Devuelve la fecha seleccionada en el formato local (Solo día, mes y año)
   */
  getFormattedDate(): string {
    return this.selected ? this.selected.toLocaleDateString() : 'Ninguna fecha seleccionada';
  }

  // Recoge la hora seleccionada en el componente de la hora
  onTimeChange(event: any) {
    console.log('Hora seleccionada:', event.detail.value);
  }
}
