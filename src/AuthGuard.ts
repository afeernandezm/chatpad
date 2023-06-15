
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguardService } from '../src/app/services/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthguardService, private router: Router) { }

  canActivate(): boolean {
    // Verificar si el usuario ha iniciado sesión
    if (this.authService.usuarioHaIniciadoSesion()) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige al inicio de sesión si el usuario no ha iniciado sesión
      this.router.navigate(['/inicioSesion']);
      return false; // Bloquea el acceso a la ruta
    }
  }
}
