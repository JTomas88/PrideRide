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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    TranslateModule,
    ToastModule
  ],
  providers:[MessageService],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  busquedaParams = {
    desde: '',
    hasta: '',
    cuando: '',
    n_plazas: '',
  };

  constructor(private router: Router, private messageService: MessageService) {
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {}

  /**
   * Función para envíar a la página concreta.
   * @queryParams => Envía los datos que se recogen en la búsqueda.
   */
  openSearchTravels() {
    const { desde, hasta, cuando, n_plazas } = this.busquedaParams;

    if (!desde && !hasta && !cuando && !n_plazas) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, rellena al menos un campo para continuar.',
      });
      return;
    }
    this.router.navigate(['/busqueda-viajes'], {
      queryParams: this.busquedaParams,
    });
  }
  
  
}
