import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [IonicModule, MatIconModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent  implements OnInit {

  constructor() {  addIcons({ eye, lockClosed });}

  ngOnInit() {}

}
