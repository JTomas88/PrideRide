import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://127.0.0.1:5000';

  private viajeDataSubject = new BehaviorSubject<any>(null);
  viajeData$ = this.viajeDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Función para guardar temporalmente los datos del viaje.
   * @param data
   */
  setViajeData(data: any) {
    this.viajeDataSubject.next(data);
  }

  getViajeData() {
    return this.viajeDataSubject.getValue();
  }

  /**
   * Función para guardar los datos del viaje en la Base de Datos.
   * 
   * @param viajeData 
   * @returns 
   */
  guardarViaje(viajeData: any): Observable<any> {
    const userDataString = localStorage.getItem('userData');  
  
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.usuario.id;
  
      viajeData.usuario_id = usuarioId;
    }  
    
    return this.http.post(this.apiUrl + '/travel/crear_viaje', viajeData);
  }

  /**
   * Función para obtener los viajes que ha creado un usuario.
   * 
   * @param usuarioId Recibe el id del usuario a consultar.
   * @returns Devuelve la lista de viajes de ese usuario.
   */
  getViajesUsuario(usuarioId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/travel/obtener_viajes_usuario', {
      params: { usuario_id: usuarioId.toString() }
    });
  }

}
