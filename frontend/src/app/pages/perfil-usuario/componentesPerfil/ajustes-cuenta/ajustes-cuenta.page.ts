import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-ajustes-cuenta',
  templateUrl: './ajustes-cuenta.page.html',
  styleUrls: ['./ajustes-cuenta.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonContent,
    CommonModule,
    FormsModule,
    TranslateModule,
    PagesnavbarComponent,
    MatIcon
  ],
})
export class AjustesCuentaPage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (
      this.userData &&
      Object.keys(this.userData).length > 0 &&
      this.userData.email
    ) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
