import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-contract',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatDivider, CommonModule],
  templateUrl: './modal-contract.component.html',
  styleUrls: ['./modal-contract.component.scss'],
})
export class ModalContractComponent implements OnInit {

  message: SafeHtml;
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; showAcceptButton: boolean },
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<ModalContractComponent>) {
    this.title = data.title;
    this.message = this.sanitizer.bypassSecurityTrustHtml(data.message);
  }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }

  aceptarCondiciones(accepted: boolean) {
    this.dialogRef.close(accepted);
  }
}
