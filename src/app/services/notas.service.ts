import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
   constructor(private http: HttpClient) { }

  actualizarNota(nota: any) {
    const url = environment.URL.notas + 'insertar-nota';

    // Realiza la solicitud HTTP PUT al backend para actualizar la nota
    return this.http.put(url, nota);
  }
}
