import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resultados-busqueda',
  standalone: true,
  imports: [IonicModule, MatIcon, TranslateModule],
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
