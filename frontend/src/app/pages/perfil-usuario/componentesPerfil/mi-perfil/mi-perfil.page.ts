import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatIcon,
    TranslateModule,
    MatDivider,
  ],
})
export class MiPerfilPage implements OnInit {
  constructor() {}

  ngOnInit() {}

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
