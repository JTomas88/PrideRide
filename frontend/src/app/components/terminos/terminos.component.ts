import { Component, OnInit } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [  
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
})
export class TerminosComponent  implements OnInit {
  
  constructor(private dialogRef: MatDialogRef<TerminosComponent>) { }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
