import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-ventana-dudas',
  standalone: true,
  imports: [MatButton, RouterModule, TranslateModule],
  templateUrl: './ventana-dudas.component.html',
  styleUrls: ['./ventana-dudas.component.scss'],
})
export class VentanaDudasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
