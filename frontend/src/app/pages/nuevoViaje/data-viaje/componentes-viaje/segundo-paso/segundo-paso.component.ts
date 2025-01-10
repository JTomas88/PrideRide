import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-segundo-paso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './segundo-paso.component.html',
  styleUrls: ['./segundo-paso.component.scss'],
})
export class SegundoPasoComponent  implements OnInit {

  origen: string = '';
  destino: string = '';

  constructor() { }

  ngOnInit() {}

}
