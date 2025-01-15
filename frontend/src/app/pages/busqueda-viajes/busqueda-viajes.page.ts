import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { MatIconModule } from '@angular/material/icon';
import { ResultadosBusquedaComponent } from 'src/app/components/resultados-busqueda/resultados-busqueda.component';
import { DatosUsuarioComponent } from '../../components/datos-usuario/datos-usuario.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

@Component({
  selector: 'app-busqueda-viajes',
  templateUrl: './busqueda-viajes.page.html',
  styleUrls: ['./busqueda-viajes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    BuscadorComponent,
    MatIconModule,
    ResultadosBusquedaComponent,
    JumbotronComponent
  ],
})
export class BusquedaViajesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
