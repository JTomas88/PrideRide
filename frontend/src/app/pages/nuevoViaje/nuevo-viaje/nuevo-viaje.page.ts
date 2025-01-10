import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, IonicModule, MatButtonModule]
})
export class NuevoViajePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
