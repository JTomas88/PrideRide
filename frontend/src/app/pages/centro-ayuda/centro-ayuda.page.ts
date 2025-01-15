import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { PagesnavbarComponent } from "../../shared/pagesnavbar/pagesnavbar.component";
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-centro-ayuda',
  templateUrl: './centro-ayuda.page.html',
  styleUrls: ['./centro-ayuda.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, IonicModule, MatButtonModule, RouterModule, MatDivider, PagesnavbarComponent]
})
export class CentroAyudaPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.email) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

}
