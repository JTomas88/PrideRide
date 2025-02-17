import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HelpModalComponent } from 'src/app/components/help-modal/help-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { GoogleServices } from 'src/app/core/google-services/google-services.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FuncionesComunes } from 'src/app/core/funciones-comunes/funciones-comunes.service';


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
    NavbarComponent,
    MatDialogModule,
    MatTooltipModule,
    ToastModule
  ],
})
export class NuevoViajePage implements OnInit {

  userLoggedIn: boolean = false;

  origen: string = '';
  destino: string = '';
  plazas: string = '';
  hora_seleccionada: string = '';

  title_help_carnet: string = 'Ayuda';
  message_help_carnet: string =
    'Necesitas registrar tu carnet de conducir en los ajustes de tu perfil para poder publicar un viaje.';
  message_help_auth: string =
    '<p>Necesitas <a href="/login">iniciar sesión</a> o <a href="/registro">registrarte</a> previamente antes de poder publicar un viaje.</p>';

  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private viajesService: TravelService,
    private googleService: GoogleServices,
    private funcionesComunes: FuncionesComunes
  ) { }

  ngOnInit() {
    this.userLoggedIn = this.funcionesComunes.isUserLoggedIn();
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
      disableClose: true,
    });
  }

  /**
   * Función para navegar hasta la página "data-viaje"
   *
   */
  goTo() {
    const viajeData = {
      origen: this.origen,
      destino: this.destino,
      plazas: this.plazas,
      hora_salida: this.hora_seleccionada
    };

    if (!this.userLoggedIn) {
      this.openHelp(this.title_help_carnet, this.message_help_auth);
    } else {
      /**
       * Se almacena temporalmente los datos del viaje.
       */
      this.viajesService.setViajeData(viajeData);
      this.router.navigate(['/data-viaje']);
    }
  }

  /**
   * Función para obtener la lista de sugerencias para el origen
   * en función de lo que escriba el usuario en el input correspondiente.
   * 
   * @param evento Recibe el evento del input.
   */
  obtenerSugerenciasOrigen(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasOrigen = respuesta;
      });
  }

   /**
   * Función para obtener la lista de sugerencias para el destino
   * en función de lo que escriba el usuario en el input correspondiente.
   * 
   * @param evento Recibe el evento del input.
   */
  obtenerSugerenciasDestino(evento: Event) {
    const contenidoInput = (evento.target as HTMLInputElement).value;
    this.googleService
      .obtenerLocalidad(contenidoInput)
      .subscribe((respuesta: any) => {
        this.sugerenciasDestino = respuesta;
      });
  }

  /**
   * Función para guardar la información de la localidad de origen seleccionada.
   * 
   * @param localidad -> Recibe la localidad seleccionada en la lista de sugerencias.
   */
  seleccionarLocalidadOrigen(localidad: any) {
    this.origen = localidad.descripcion.split(',')[0].trim();
    this.sugerenciasOrigen = [];
  }


  /**
   * Función para guardar la información de la localidad de destino seleccionada.
   * 
   * @param localidad -> Recibe la localidad seleccionada en la lista de sugerencias.
   */
  seleccionarLocalidadDestino(localidad: any) {
    this.destino = localidad.descripcion.split(',')[0].trim();
    this.sugerenciasDestino = [];
  }
}
