import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-info-visible-page',
  templateUrl: './info-visible-page.page.html',
  styleUrls: ['./info-visible-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    PagesnavbarComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InfoVisiblePagePage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor() {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userLoggedIn = !!(this.userData && this.userData.usuario.email);
  }
}
