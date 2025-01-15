import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { IonRow, IonCol } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cuenta-usuario',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    MatIcon,
    TranslateModule,
  ],
  templateUrl: './cuenta-usuario.component.html',
  styleUrls: ['./cuenta-usuario.component.scss'],
})
export class CuentaUsuarioComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<CuentaUsuarioComponent>) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
