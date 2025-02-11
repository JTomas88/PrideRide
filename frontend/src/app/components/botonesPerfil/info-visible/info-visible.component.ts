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
} from './../../../models/vehiculos/marcas_modelos.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-visible',
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
  templateUrl: './info-visible.component.html',
  styleUrls: ['./info-visible.component.scss'],
})
export class InfoVisibleComponent implements OnInit {
  listadoCoches = CARS;
  marcaSeleccionada: string = '';
  modeloSeleccionado: string = '';
  colorSeleccionado: string = '';
  modelosFiltrados: string[] = [];
  listadoColores: string[] = COLORES;

  constructor(private dialogRef: MatDialogRef<InfoVisibleComponent>) {}

  ngOnInit() {
    console.log(this.listadoCoches);
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
}
