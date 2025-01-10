import { Component, OnInit, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-primer-paso',
  standalone: true,
  imports: [IonicModule, MatIcon, MatCardModule, MatDatepickerModule],
  templateUrl: './primer-paso.component.html',
  styleUrls: ['./primer-paso.component.scss'],
})
export class PrimerPasoComponent  implements OnInit {
selected = model<Date | null>(null);
  constructor() { }

  ngOnInit() {}
  onTimeChange(event: any) {
    console.log('Hora seleccionada:', event.detail.value);
  }
}
