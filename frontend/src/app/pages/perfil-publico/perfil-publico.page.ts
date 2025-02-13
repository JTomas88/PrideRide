import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionesComunes } from 'src/app/core/funciones-comunes/funciones-comunes.service';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { UserServicesService } from 'src/app/core/user-services/user-services.service';

@Component({
  selector: 'app-perfil-publico',
  templateUrl: './perfil-publico.page.html',
  styleUrls: ['./perfil-publico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class PerfilPublicoPage implements OnInit {

  userLoggedIn: boolean = false;
  usuarioParams: any = {};
  usuario: any;

  constructor(private route: ActivatedRoute, private funcionesComunes: FuncionesComunes, private userService: UserServicesService) { }

  ngOnInit() {
    this.userLoggedIn = this.funcionesComunes.isUserLoggedIn();
    this.route.queryParams.subscribe((params) => {
      this.usuarioParams = params;  
      const userId = parseInt(this.usuarioParams.id, 10);
      this.obtenerUsuarioPorID(userId);
    });
  }


  /**
   * Función para obtener los datos de un usuario.
   * 
   * @param id_usuario 
   */
  obtenerUsuarioPorID(id_usuario: number) {
    this.userService.obtenerUsuarioPorID(id_usuario).subscribe((resultadoUsuario) => {
      this.usuario = resultadoUsuario;
      console.log('Parámetros recibidos:', this.usuario);
    });
  }
}
