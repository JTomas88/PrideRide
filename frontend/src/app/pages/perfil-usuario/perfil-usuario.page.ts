import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MatIcon } from '@angular/material/icon';
import { DatosUsuarioComponent } from '../../components/datos-usuario/datos-usuario.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    MatIcon,
    DatosUsuarioComponent,
  ],
})
export class PerfilUsuarioPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
