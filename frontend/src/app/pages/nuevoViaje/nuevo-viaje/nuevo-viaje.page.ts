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
import { TravelService } from 'src/app/core/travel-services/travel.service';


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


  title_help_carnet: string = 'Ayuda';
  message_help_carnet: string = 'Necesitas registrar tu carnet de conducir en los ajustes de tu perfil para poder publicar un viaje.';
  message_help_auth: string = '<p>Necesitas <a href="/login">iniciar sesión</a> o <a href="/registro">registrarte</a> previamente antes de poder publicar un viaje.';

  constructor(private router: Router, private dialog: MatDialog, private viajesService: TravelService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.email) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  /**
   * Función para navegar hasta la página "data-viaje"
   *
   */
  goTo() {
    const viajeData = { origen: this.origen, destino: this.destino, viajeros: this.viajeros };
    if(!this.userLoggedIn){
      this.openHelp(this.title_help_carnet, this.message_help_auth)
    } else {
 
      /**
       * Se almacena temporalmente los datos del viaje.
       */
      this.viajesService.setViajeData(viajeData);
      this.router.navigate(['/data-viaje']);
    }
  }

  /**
   * Función para abrir una ventana modal con mensajes de ayuda.
   * 
   * @param title Recibe el título que se va a mostrar en la ventana.
   * @param message Recibe el contenido que se va a mostrar en la ventana.
   */
  openHelp(title: string, message: string) {
    this.dialog.open(HelpModalComponent, {
      data: { title, message },
      disableClose: true
    });
  }

}
