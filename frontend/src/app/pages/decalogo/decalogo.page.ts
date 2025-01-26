import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-decalogo',
  templateUrl: './decalogo.page.html',
  styleUrls: ['./decalogo.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonAccordion,
  ],
})
export class DecalogoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
