import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../shared/footer/footer.component';
import { JumbotronComponent } from "../pages/jumbotron/jumbotron.component";
import { BuscadorComponent } from "../components/buscador/buscador.component";
import { InfoComponent } from "../components/info/info.component";
import { NuevoViajeGeneralComponent } from "../components/nuevo-viaje-general/nuevo-viaje-general.component";
import { TrayectosPopularesComponent } from '../components/trayectos-populares/trayectos-populares.component';
import { VentanaDudasComponent } from '../components/ventana-dudas/ventana-dudas.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FuncionesComunes } from '../core/funciones-comunes/funciones-comunes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    FooterComponent,
    JumbotronComponent,
    BuscadorComponent,
    InfoComponent,
    NuevoViajeGeneralComponent,
    MatDividerModule,
    TrayectosPopularesComponent,
    VentanaDudasComponent,
    TranslateModule,
    AnimateOnScrollModule,
    NavbarComponent
]
})
export class HomePage implements OnInit {

  userLoggedIn: boolean = false;

  constructor(private translate: TranslateService, private funcionesComunes: FuncionesComunes) { }

  ngOnInit(): void {
    this.userLoggedIn = this.funcionesComunes.isUserLoggedIn();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
