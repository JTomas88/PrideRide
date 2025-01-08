import { Component, OnInit } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [  
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule
  ],
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
})
export class TerminosComponent  implements OnInit {
  
  constructor() { }

  ngOnInit() {}

}
