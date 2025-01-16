import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ajustes-cuenta',
  templateUrl: './ajustes-cuenta.page.html',
  styleUrls: ['./ajustes-cuenta.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    MatIcon,
    TranslateModule,
  ],
})
export class AjustesCuentaPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
