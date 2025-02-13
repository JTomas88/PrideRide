import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user/usuario.model';

@Injectable({
    providedIn: 'root',
})
export class FuncionesComunes {

    userData: Usuario = {} as Usuario;

    constructor() {
        this.loadUserData();
    }

    /**
     * Función para recoger de "localStorage" los datos del usuario, si los hay.
     */
    private loadUserData(): void {
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    }

    /**
     *      Función para validar si el usuario está logado o no.
     * 
     * -> Verifica que "userData" existe.
     * -> Verifica si "userData" tiene datos.
     * -> Verifica si hay un "email" en los atributos del usuario.
     * 
     * @returns Si todas las validaciones se cumplen, devuelve un TRUE, en caso contrario FALSE.
     */
    isUserLoggedIn(): boolean {
        if (!this.userData) return false;
        if (Object.keys(this.userData).length === 0) return false;
        if (!this.userData.usuario?.email) return false;
    
        return true;
    }    

}