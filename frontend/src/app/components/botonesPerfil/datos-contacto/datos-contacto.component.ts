import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
  selector: 'app-datos-contacto',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    MatIcon,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.scss'],
})
export class DatosContactoComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DatosContactoComponent>) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const fileNames = Array.from(input.files).map((file) => file.name);
      console.log('Archivos seleccionados:', fileNames);

      // Aquí puedes manejar los archivos, por ejemplo, enviarlos a un servidor
      alert(
        `${fileNames.length} imágenes seleccionadas: ${fileNames.join(', ')}`
      );
    }
  }
}
