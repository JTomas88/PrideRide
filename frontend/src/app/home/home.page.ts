import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent, 
    NavbarComponent, 
    FooterComponent, 
    JumbotronComponent, 
    BuscadorComponent, 
    InfoComponent, 
    NuevoViajeGeneralComponent, 
    MatDividerModule, 
    TrayectosPopularesComponent,
    VentanaDudasComponent
  ],
})
export class HomePage {
  constructor() { }
}
