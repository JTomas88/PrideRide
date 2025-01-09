import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  pasoActual: number = 1;
  formulario1: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;
  paso1: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario1 = this.fb.group({
      email: ['', Validators.required],
      fnacimiento: ['', Validators.required],
    });

    this.formulario2 = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      orientacion: ['', Validators.required],
    });

    this.formulario3 = this.fb.group({
      password: ['', Validators.required, Validators.minLength(6)],
    });
  }

  ngOnInit() {
    if (this.pasoActual === 1) {
      this.paso1 = true;
    }
  }

  /**
   * Función para avanzar al siguiente formulario. Valida el formulario actual en el que estemos
   */
  siguientePaso() {
    if (this.pasoActual === 1 && this.formulario1.valid) {
      this.pasoActual++;
      this.paso1 = false;
    } else if (this.pasoActual === 2 && this.formulario2.valid) {
      this.pasoActual++;
      this.paso1 = false;
    }
  }

  /**
   * Función para retroceder al formulario anterior.
   */
  pasoAnterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
}
