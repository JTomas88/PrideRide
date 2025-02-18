import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionesComunes } from 'src/app/core/funciones-comunes/funciones-comunes.service';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { UserServicesService } from 'src/app/core/user-services/user-services.service';
import { Usuario } from 'src/app/models/user/usuario.model';


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
  editar_perfil: boolean = false;
  userData: Usuario = {} as Usuario;
  preferenciasViaje: string = '';

  constructor(private route: ActivatedRoute,
    private funcionesComunes: FuncionesComunes,
    private userService: UserServicesService) {

  }

  ngOnInit() {
    this.userLoggedIn = this.funcionesComunes.isUserLoggedIn();
    this.route.queryParams.subscribe((params) => {
      this.usuarioParams = params;
      
      const userId = parseInt(this.usuarioParams.id, 10);
      this.obtenerUsuarioPorID(userId);
      this.validacionPerilLogeado(userId);
    });
  }


  validacionPerilLogeado(id_usuario: number) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (id_usuario === this.userData.usuario.id) {
      this.editar_perfil = true;
    } else {
      this.editar_perfil = false;
    }
  }

  /**
   * Función para obtener los datos de un usuario.
   * 
   * @param id_usuario 
   */
  obtenerUsuarioPorID(id_usuario: number) {
    this.userService.obtenerUsuarioPorID(id_usuario).subscribe((resultadoUsuario) => {
      this.usuario = resultadoUsuario;
      this.preferenciasViaje = this.funcionesComunes.validacionPreferencias(this.usuario);
      console.log('Parámetros recibidos:', this.usuario);
    });
  }
}
