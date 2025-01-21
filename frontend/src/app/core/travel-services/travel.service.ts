import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private viajeDataSubject = new BehaviorSubject<any>(null);
  viajeData$ = this.viajeDataSubject.asObservable();

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
}
