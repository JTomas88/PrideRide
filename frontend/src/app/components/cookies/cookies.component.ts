import { Component, OnInit } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule
  ],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
})
export class CookiesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
