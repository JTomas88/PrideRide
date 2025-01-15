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
import { UserServicesService } from '../core/user-services/user-services.service';


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
    VentanaDudasComponent,
    TranslateModule
  ]
})
export class HomePage implements OnInit{

  constructor(private translate: TranslateService, private userService: UserServicesService) { }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    const usuario = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('DATOS DEL USUARIO LOGADO: ', usuario);
    
  }

  obtenerUsuarios(){
    this.userService.obtenerUsuarios().subscribe((respuesta) => {
      console.log('LISTA USUARIOS: ', respuesta);
    },
    (error) => {
      console.error('Error al obtener la lista de usuarios registrados:', error);
    })
  }
}
