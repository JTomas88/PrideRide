import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { JumbotronComponent } from "../pages/jumbotron/jumbotron.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone:true,
  styleUrls: ['home.page.scss'],
  imports: [IonContent, NavbarComponent, FooterComponent, JumbotronComponent],
})
export class HomePage {
  constructor() {}
}
