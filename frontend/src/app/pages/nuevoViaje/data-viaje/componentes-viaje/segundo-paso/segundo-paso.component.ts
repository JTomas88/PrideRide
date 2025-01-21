import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TravelService } from 'src/app/core/travel-services/travel.service';

@Component({
  selector: 'app-segundo-paso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './segundo-paso.component.html',
  styleUrls: ['./segundo-paso.component.scss'],
})
export class SegundoPasoComponent implements OnInit {

  origen: string = '';
  destino: string = '';

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    const viajeData = this.travelService.getViajeData();
    if (viajeData) {
      this.origen = viajeData.origen || 'Sin especificar';
      this.destino = viajeData.destino || 'Sin especificar';
      console.log('Datos del origen y del destino recibidos:', viajeData);
    }
  }
}
