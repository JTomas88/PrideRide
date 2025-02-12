import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {
  CARS,
  COLORES,
  COLOURS,
} from '../../../models/vehiculos/marcas_modelos.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    MatIcon,
    TranslateModule,
    MatButtonModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  listadoCoches = CARS;
  marcaSeleccionada: string = '';
  modeloSeleccionado: string = '';
  colorSeleccionado: string = '';
  modelosFiltrados: string[] = [];
  listadoColores: string[] = COLORES;
  listColours: string[] = COLOURS;
  validacionIdioma: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<MiPerfilComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.listadoCoches);
    const idioma = localStorage.getItem('language');

    if (idioma === 'es') {
      this.validacionIdioma = true;
    } else {
      this.validacionIdioma = false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  filtrarModelos() {
    const coche = this.listadoCoches.find(
      (vehiculo) => vehiculo.marca === this.marcaSeleccionada
    );
    this.modelosFiltrados = coche ? coche.modelos : []; //si "coche" viene con algún dato, saca los modelos y los guarda en "modelosFiltrados". Si no (:), guarda un array vacio
    this.modeloSeleccionado = '';
  }

  openInfoVisible() {
    this.router.navigate(['/info-visible'], {});
    this.closeDialog();
  }
}
