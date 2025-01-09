import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { InfoVisibleComponent } from '../botonesPerfil/info-visible/info-visible.component';

@Component({
  selector: 'app-datos-usuario',
  standalone: true,
  imports: [IonicModule, InfoVisibleComponent],
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
}
