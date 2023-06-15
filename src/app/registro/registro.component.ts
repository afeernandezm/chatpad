import { ServicioUsuarioService } from './../services/servicio-usuario.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
notyf: Notyf;
  nombre: string;
  apellidos: string;
  email: string;
  contrasenya: string;


  constructor(private http: HttpClient,private servicioUsuario: ServicioUsuarioService) {
    this.nombre = '';
    this.apellidos = '';
    this.email = '';
    this.contrasenya = '';
    this.notyf = new Notyf();

  }
  registrar(): void {
    const { nombre, apellidos, email, contrasenya } = this;

    this.servicioUsuario.registrar(nombre, apellidos, email, contrasenya);
  }

}
