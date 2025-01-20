import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private viajeDataSubject = new BehaviorSubject<any>(null);
  viajeData$ = this.viajeDataSubject.asObservable();

  setViajeData(data: any) {
    this.viajeDataSubject.next(data);
  }

  getViajeData() {
    return this.viajeDataSubject.getValue();
  }
}
