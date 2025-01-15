import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { InfoVisibleComponent } from '../botonesPerfil/info-visible/info-visible.component';
import { DatosContactoComponent } from '../botonesPerfil/datos-contacto/datos-contacto.component';
import { CuentaUsuarioComponent } from '../botonesPerfil/cuenta-usuario/cuenta-usuario.component';
import { SaldoTransferenciasComponent } from '../botonesPerfil/saldo-transferencias/saldo-transferencias.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datos-usuario',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss'],
})
export class DatosUsuarioComponent implements OnInit {
  dialog = inject(MatDialog);

  constructor() {}

  ngOnInit() {}

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
