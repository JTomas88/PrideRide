import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-visible',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDividerModule, MatIcon],
  templateUrl: './info-visible.component.html',
  styleUrls: ['./info-visible.component.scss'],
})
export class InfoVisibleComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<InfoVisibleComponent>) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
