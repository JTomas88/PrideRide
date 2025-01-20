import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

import { trigger, style, transition, animate } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-help-modal',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatDivider],
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class HelpModalComponent implements OnInit {

  /**
   * En la variable "message" utilizamos el tipado de objetos SafeHtml
   * para incrustar de forma segura código HTML en dicha variable
   * y mostrar ese código en el HTML del componente.
   */
  message: SafeHtml;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  private sanitizer: DomSanitizer,
  private dialogRef: MatDialogRef<HelpModalComponent>) { 
    this.title = data.title;
    this.message = this.sanitizer.bypassSecurityTrustHtml(data.message);
  }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }

}
