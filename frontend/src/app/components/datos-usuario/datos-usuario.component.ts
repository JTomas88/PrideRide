import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoVisibleComponent } from '../botonesPerfil/info-visible/info-visible.component';
import { DatosContactoComponent } from '../botonesPerfil/datos-contacto/datos-contacto.component';
import { CuentaUsuarioComponent } from '../botonesPerfil/cuenta-usuario/cuenta-usuario.component';
import { SaldoTransferenciasComponent } from '../botonesPerfil/saldo-transferencias/saldo-transferencias.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { Usuario } from 'src/app/models/user/usuario.model';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-usuario',
  standalone: true,
  imports: [IonicModule, TranslateModule, MatButton, MatTooltipModule],
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss'],
})
export class DatosUsuarioComponent implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;
  viajes_del_usuario: any;

  constructor(
    private dialog: MatDialog,
    private travelService: TravelService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.usuario.email);
    this.obtenerViajes();
  }

  openInfoVisible() {
    this.dialog.open(InfoVisibleComponent, {});
  }
  openDatosContacto() {
    this.dialog.open(DatosContactoComponent, {});
  }
  openAjustesCuenta() {
    this.dialog.open(CuentaUsuarioComponent, {});
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
