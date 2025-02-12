import { Usuario } from './../../models/user/usuario.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { DatosContactoComponent } from 'src/app/components/botones-panel-usuario/datos-contacto/datos-contacto.component';
import { VerificarPerfilComponent } from 'src/app/components/botones-panel-usuario/verificar-perfil/verificar-perfil.component';
import { SaldoTransferenciasComponent } from 'src/app/components/botones-panel-usuario/saldo-transferencias/saldo-transferencias.component';
import { IonicModule } from '@ionic/angular';
import { MiPerfilComponent } from 'src/app/components/botones-panel-usuario/mi-perfil/mi-perfil.component';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.page.html',
  styleUrls: ['./panel-usuario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    TranslateModule,
    IonicModule,
  ],
})
export class PanelUsuarioPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor(
    private dialog: MatDialog,
    private travelService: TravelService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.usuario.email);
  }
  openMiPerfil() {
    this.dialog.open(MiPerfilComponent, {});
  }
  openDatosContacto() {
    this.dialog.open(DatosContactoComponent, {});
  }
  openVerificarPerfil() {
    this.dialog.open(VerificarPerfilComponent, {});
  }
  openSaldoTransferencias() {
    this.dialog.open(SaldoTransferenciasComponent, {});
  }

  /**
   * Función para obtener los viajes que ha creado el usuario.
   *
   */
  obtenerViajes() {
    this.travelService
      .getViajesUsuario(this.userData.usuario.id)
      .subscribe((result) => {
        console.log('Viajes del usuario: ', result);
      });
  }
}
