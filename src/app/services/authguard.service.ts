import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }

  usuarioHaIniciadoSesion(): boolean {

    const usuario = localStorage.getItem('usuario');
    return !!usuario;
  }
}
