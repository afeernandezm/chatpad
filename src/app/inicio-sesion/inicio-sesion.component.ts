import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServicioUsuarioService } from './../services/servicio-usuario.service';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  usuario: any;
  public inicioSesionExitoso: boolean = false;

  constructor(private router: Router,private http: HttpClient,private servicioUsuario: ServicioUsuarioService){}

  irAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  llamarIniciarSesion(event: Event): void {
    this.servicioUsuario.iniciarSesion(event);
  }

}
