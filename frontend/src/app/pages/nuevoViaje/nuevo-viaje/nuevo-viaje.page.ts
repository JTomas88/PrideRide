import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';
import { HelpModalComponent } from 'src/app/components/help-modal/help-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    IonicModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    PagesnavbarComponent,
    MatDialogModule
  ]
})
export class NuevoViajePage implements OnInit {

  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  origen: string = '';
  destino: string = '';
  viajeros: string = '';


  title_help: string = 'Ayuda';
  message_help: string = 'Necesitas registrar tu carnet de conducir en los ajustes de tu perfil para poder publicar un viaje.';

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.email);
  }

  /**
   * Función para navegar hasta la página "data-viaje"
   */
  goTo() {
    const viajeData = { origen: this.origen, destino: this.destino, viajeros: this.viajeros };
    this.router.navigate(['/data-viaje'], { state: { viajeData } });
  }

  openHelp(title: string, message: string) {
    this.dialog.open(HelpModalComponent, {
      data: { title, message },
      disableClose: true
    });
  }

}
