import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { Usuario } from '../models/user/usuario.model';

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
export class HomePage implements OnInit, AfterViewInit {

  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
        /**
     * Se recoge la información del usuario de la caché si la hay,
     * en caso de no haber información, userData sería un objeto vacío {}.
     */
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
        /**
         * Se comprueba el contenido de "userData", si contiene información y adeás hay datos
         * en el atributo "email" de "userData" entonces "userLoggedIn" pasaría a tener el valor "true".
         * 
         * Si "userLoggedIn" tiene el valor "true" esto significa que el usuario está logado correctamente.
         * En el caso contrario, su valor sería "false".
         */
        if (this.userData && Object.keys(this.userData).length > 0 && this.userData.usuario.email) {
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
        }
  }

  ngAfterViewInit(): void {
    // Crear el observer cuando la vista se haya inicializado
    this.setupIntersectionObserver();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  setupIntersectionObserver(): void {
    // Crear el observer para los elementos que tienen la clase 'animate-on-scroll'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          // Cuando el elemento entra en el viewport, agregar la clase de animación
          element.classList.add('animate-scalein');
        } else {
          // Cuando el elemento sale del viewport, eliminar la clase
          element.classList.remove('animate-scalein');
        }
      });
    }, {
      threshold: 0.1 // Hacer que se active cuando al menos el 10% del elemento esté visible
    });

    // Observar todos los elementos que tienen el atributo pAnimateOnScroll
    const elements = document.querySelectorAll('[pAnimateOnScroll]');
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

}
