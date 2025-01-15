import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/registro`, datos);
  }
}
