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

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.email);
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
}
