import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    IonicModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormFieldModule, 
    CommonModule, 
    FormsModule,
    TranslateModule
  ],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  busquedaParams = {
    desde: '',
    hasta: '',
    cuando: '',
    numPersonas: '',
  };

  constructor(private router: Router) {
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {}

  /**
   * Función para envíar a la página concreta.
   * @queryParams => Envía los datos que se recogen en la búsqueda.
   */
  openSearchTravels() {
    console.log('Parametros de búsqueda:', this.busquedaParams);
    // Navega a la página de resultados con los parámetros de búsqueda
    this.router.navigate(['/busqueda-viajes'], {
      queryParams: this.busquedaParams
    });
  }
}
