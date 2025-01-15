import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

@Component({
  selector: 'app-centro-ayuda',
  templateUrl: './centro-ayuda.page.html',
  styleUrls: ['./centro-ayuda.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    IonicModule, 
    MatButtonModule, 
    RouterModule, 
    MatDivider, 
    JumbotronComponent
    
  ]
})
export class CentroAyudaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
