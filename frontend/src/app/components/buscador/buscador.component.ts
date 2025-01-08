import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [IonicModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent  implements OnInit {

  constructor() {  addIcons({ eye, lockClosed });}

  ngOnInit() {}

}
