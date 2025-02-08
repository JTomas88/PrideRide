import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TravelService } from 'src/app/core/travel-services/travel.service';
import { Usuario } from 'src/app/models/user/usuario.model';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HelpModalComponent } from 'src/app/components/help-modal/help-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/components/modal-error/modal-error.component';

@Component({
  selector: 'app-resumen-viaje',
  standalone: true,
  imports: [IonicModule,
    MatIcon,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    PagesnavbarComponent,
    MatDivider,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './resumen-viaje.component.html',
  styleUrls: ['./resumen-viaje.component.scss'],
})
export class ResumenViajeComponent implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  currentViajeData: any;

  constructor(private travelService: TravelService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    /**
     * Se valida si el usuario está logado o no
     */
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (
      this.userData &&
      Object.keys(this.userData).length > 0 &&
      this.userData.usuario.email
    ) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  /**
   * Función para confirmar el viaje.
   * Al confirmar mostramos un mensaje de confirmación para informar al usuario
   * Y a continuación se guardam los datos en BBDD.
   * 
   * Una vez confirmado el mensaje, se reenvía a la ventana home.
   */
  confirmarViaje() {
    const title: string = 'Confirmación de Viaje';
    const message: string = 'El viaje ha sido confirmado con éxito.';

    this.currentViajeData.plazas = Number(this.currentViajeData.plazas);
    if (isNaN(this.currentViajeData.plazas)) {
      this.openError('Error!', 'El número de plazas no es válido. Por favor, verifica los datos.');
      return;
    }

    const fechaSalida = new Date(this.currentViajeData.fecha_salida).toISOString().split('T')[0];
    this.currentViajeData.fecha_salida = fechaSalida;

    this.travelService.guardarViaje(this.currentViajeData).subscribe(
      (response) => {
        const dialogRef = this.openHelp(title, message);
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      },
      (error) => {
        this.openError('Error!', 'Error al guardar el viaje. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error al guardar el viaje:', error);
      }
    );
  }

  /**
   * Función para dar un formato específico a la fecha.
   */
  getFormattedDate(): string {
    if (this.currentViajeData.fecha_salida) {
      const date = new Date(this.currentViajeData.fecha_salida);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    }
    return 'Ninguna fecha seleccionada.';
  }

  /**
   * Función que nos va a devolver a la pantalla de inicio del viaje
   */
  volverAInicioDelViaje() {
    this.router.navigate(['/data-viaje']);
  }

  /**
   * Función para abrir la ventana emergente de ayuda
   * para informar al usuario.
   * 
   * @param title Título que se va a mostrar en la ventana
   * @param message Mensaje que se va a mostrar en la ventana
   */
  openHelp(title: string, message: string) {
    return this.dialog.open(HelpModalComponent, {
      data: { title, message },
      disableClose: true,
    });
  }

  /**
   * Función para abrir la ventana emergente de error
   * para informar al usuario.
   * 
   * @param title Título que se va a mostrar en la ventana
   * @param message Mensaje que se va a mostrar en la ventana
   */
  openError(title: string, message: string) {
    return this.dialog.open(ModalErrorComponent, {
      data: { title, message },
      disableClose: true,
    });
  }
}
