import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-resultados-busqueda',
  standalone: true,
  imports: [IonicModule, MatIcon, TranslateModule],
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor() {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.email);
  }
}
