import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-data-viaje',
  templateUrl: './data-viaje.page.html',
  styleUrls: ['./data-viaje.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DataViajePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
