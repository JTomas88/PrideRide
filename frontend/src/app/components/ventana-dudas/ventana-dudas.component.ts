import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-ventana-dudas',
  standalone: true,
  imports: [MatButton],
  templateUrl: './ventana-dudas.component.html',
  styleUrls: ['./ventana-dudas.component.scss'],
})
export class VentanaDudasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
