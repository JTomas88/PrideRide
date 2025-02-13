import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TravelService } from 'src/app/core/travel-services/travel.service';

@Component({
  selector: 'app-cuarto-paso',
  standalone: true,
  imports: [MatButtonModule, FormsModule],
  templateUrl: './cuarto-paso.component.html',
  styleUrls: ['./cuarto-paso.component.scss'],
})
export class CuartoPasoComponent implements OnInit {

  precio: number | null = null;
  tercer_paso: boolean = false;
  cuarto_paso: boolean = false;

  constructor(private travelService: TravelService, private messageService: MessageService, private router: Router) { }

  ngOnInit() { }

  onCuartoPasoBack() {
    this.tercer_paso = true;
    this.cuarto_paso = false;
  }

  onCuartoPasoComplete() {
    console.log('Precio ingresado:', this.precio);
    if (!this.precio || this.precio <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Precio no válido',
        detail: 'Por favor, introduce un precio válido para el viaje.',
        life: 3000
      });
    } else {
      const viajeData = {
        ...this.travelService.getViajeData(),
        precio_viaje: this.precio,
      };
      this.travelService.setViajeData(viajeData);
      console.log('Datos guardados en TravelService:', this.travelService.getViajeData());
      this.router.navigate(['/resumen-viaje'], {
        queryParams: this.travelService.getViajeData()
      });
    }
    this.tercer_paso = false;
  }
}
