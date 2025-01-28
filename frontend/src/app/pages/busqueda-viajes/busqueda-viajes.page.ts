import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
} from '@ionic/angular/standalone';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { MatIconModule } from '@angular/material/icon';
import { ResultadosBusquedaComponent } from 'src/app/components/resultados-busqueda/resultados-busqueda.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda-viajes',
  templateUrl: './busqueda-viajes.page.html',
  styleUrls: ['./busqueda-viajes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    BuscadorComponent,
    MatIconModule,
    ResultadosBusquedaComponent,
    JumbotronComponent,
    PagesnavbarComponent
  ],
})
export class BusquedaViajesPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  /** Objeto para guardar los parámetros que vienen en la URL */
  busquedaParams: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.email) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    /**
     * Aquí se obtienen los datos de los parámetros de la URL.
     */
    this.route.queryParams.subscribe((params) => {
      this.busquedaParams = params;
      console.log('Parámetros recibidos:', this.busquedaParams);
    });
  }
}
