import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRow, IonCol } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/models/user/usuario.model';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { MatDivider } from '@angular/material/divider';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verificaciones-perfil',
  templateUrl: './verificaciones-perfil.page.html',
  styleUrls: ['./verificaciones-perfil.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonContent,
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    MatDivider,
    TranslateModule,
  ],
})
export class VerificacionesPerfilPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor() {}

  ngOnInit() {}
}
