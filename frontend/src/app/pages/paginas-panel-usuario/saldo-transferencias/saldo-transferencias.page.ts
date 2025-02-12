import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonGrid,
} from '@ionic/angular/standalone';
import { Usuario } from 'src/app/models/user/usuario.model';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-saldo-transferencias',
  templateUrl: './saldo-transferencias.page.html',
  styleUrls: ['./saldo-transferencias.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonCol,
    IonRow,
    IonContent,
    CommonModule,
    FormsModule,
    NavbarComponent,
    TranslateModule,
  ],
})
export class SaldoTransferenciasPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;
  constructor() {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.usuario.email);
  }
}
