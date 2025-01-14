import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, MatIconModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {}

  changeLanguage(lang: string) {
    this.translate.use(lang); // Cambiar idioma
  }
}
