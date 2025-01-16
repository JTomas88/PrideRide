import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  private dialogRef: MatDialogRef<HelpModalComponent>) { }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }

}
