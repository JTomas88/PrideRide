import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-centro-ayuda',
  templateUrl: './centro-ayuda.page.html',
  styleUrls: ['./centro-ayuda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CentroAyudaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
