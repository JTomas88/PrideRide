import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PagesnavbarComponent } from 'src/app/shared/pagesnavbar/pagesnavbar.component';
import { Usuario } from 'src/app/models/user/usuario.model';



@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    IonicModule, 
    MatButtonModule, 
    RouterModule, 
    TranslateModule,
    PagesnavbarComponent
  ]
})
export class NuevoViajePage implements OnInit {
  userLoggedIn: boolean = false;
  userData: Usuario = {} as Usuario;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && Object.keys(this.userData).length > 0 && this.userData.email) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  /**
   * Función para navegar hasta la página "data-viaje"
   */
  goTo() {
    this.router.navigate(['/data-viaje'], {});
  }

}
