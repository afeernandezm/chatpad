import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Notyf } from 'notyf';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {
  private notyf: Notyf;
  constructor(private http: HttpClient) {
    this.notyf = new Notyf({
      position: {
        x: 'right',
        y: 'top'
      }
    });
   }

  registrar(nombre: string, apellidos: string, email: string, contrasenya: string): void {
    const url = environment.URL.usuarios + 'usuario';
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner
    const data = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      contrasenya: contrasenya,
    };

    this.http.post(url, data).subscribe(
      (response) => {
        this.notyf.success('Registro exitoso');
        console.log(response);
        spinner.style.display = 'none';
        localStorage.setItem('usuario', JSON.stringify(response));
        setTimeout(() => {
          location.href = '/';
        }, 3000); // Espera 3 segundos antes de cambiar la ubicación
      },
      (error) => {

        console.error(error);
        spinner.style.display = 'none';
        let errorMessage = "Error al registrar";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.notyf.error(errorMessage);
      }
    );
  }

  iniciarSesion(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    const email = (form.querySelector('input[name=email]') as HTMLInputElement)?.value;
    const contrasenya = (form.querySelector('input[name=contrasenya]') as HTMLInputElement)?.value;

    const data = {
      email: email,
      contrasenya: contrasenya,
    };

    this.http.post(environment.URL.usuarios + 'iniciarSesion', data).subscribe(
      (response) => {
        console.log(response);
        spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta

        this.notyf.success('Inicio de sesión exitoso');

        setTimeout(() => {
          window.location.href = environment.location;
        }, 3000);

        localStorage.setItem('usuario', JSON.stringify(response));
      },
      (error) => {
        console.error(error);
        spinner.style.display = 'none';
        let errorMessage = "Error al iniciar sesion";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.notyf.error(errorMessage);
      }
    );
  }

  getUsersEmails(): Observable<string[]> {
    return this.http.get<string[]>(environment.URL.usuarios + 'emails');
  }
}
