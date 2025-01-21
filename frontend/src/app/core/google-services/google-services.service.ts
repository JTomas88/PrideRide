import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleServices {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  obtenerLocalidad(localidad: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/apigoogle/buscar_localidad?q=${localidad}`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la localidad:', error);
          throw error;
        })
      );
  }
}
