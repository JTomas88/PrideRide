import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
   * @param id 
   * @returns 
   */
  guardarViaje(viajeData: any, id: number): Observable<any> {
    const viaje = {
      ...viajeData,
      userId: id,
    };

    return this.http.post(this.apiUrl, viaje);
  }
}
