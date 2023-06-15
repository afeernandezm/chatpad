import { ServicioUsuarioService } from './../services/servicio-usuario.service';
import { NotasService } from './../services/notas.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  fechaActual: string | null = null;
  notas: any[] = [];
  titulo: string = "";
  cuerpo = "";
  color = "";
  nuevoTitulo: string = "";
  nuevoCuerpo = "";
  nuevoColor = "";
  fecha: string = "";
  usuarioString = localStorage.getItem("usuario");
  usuarioObjeto = this.usuarioString ? JSON.parse(this.usuarioString) : null;
  id_usuario = this.usuarioObjeto.id_usuario;
  public idNotaSeleccionada: number = 0;
  private notyf: Notyf;
  userEmails: string[] = [];
  userEmail = "";
envioExitoso=false;


  constructor(private datePipe: DatePipe, private http: HttpClient, private servicioNotas: NotasService, private servicioUsuario: ServicioUsuarioService) {
    this.obtenerFechaHoraActual();
    this.fechaActual = "";
    this.notyf = new Notyf({
      position: {
        x: 'right',
        y: 'top'
      }
    });
  }
  ngOnInit() {
    this.obtenerFechaHoraActual();
    this.getNotas();
    this.getUserEmails();
    this.userEmails = [];
  }

  getUserEmails(): void {
    this.servicioUsuario.getUsersEmails().subscribe(
      (response: any) => {
        if (Array.isArray(response.emails)) {
          this.userEmails = response.emails;
          console.log(this.userEmails);
        } else {
          console.error('La respuesta del servidor no contiene un array de emails.');
        }
      },
      (error) => {
        console.error('Error al obtener los correos electrónicos de los usuarios:', error);
      }
    );
  }


  obtenerFechaHoraActual() {
    const fechaHora = new Date();
    this.fechaActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');

  }
  seleccionarNota(id_nota: number) {
    this.idNotaSeleccionada = id_nota;
    console.log(id_nota)
  }

  getNotas() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (usuario) {
      const id_usuario = usuario.id_usuario.toString();
      console.log('ID del usuario:', id_usuario);
      this.http.get<any[]>(environment.URL.notas + 'getNotas/' + id_usuario)
        .subscribe(
          (response) => {
            console.log(response);
            this.notas = response;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('No se encontró el objeto usuario en el almacenamiento local');
    }
    this.notas.forEach(nota => {
      nota.posX = 0; // Valor inicial en el eje X
      nota.posY = 0; // Valor inicial en el eje Y
    });
  }

  insertarNota(): void {
    const url = environment.URL.notas + 'insertar-nota';
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    const data = {
      titulo: this.titulo,
      cuerpo: this.cuerpo,
      fecha: this.fechaActual,
      id_usuario: this.id_usuario
    };
    console.log(data)
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        this.notyf.success('Nota insertada con éxito');
        spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta
        // Reiniciar los valores del formulario
        this.titulo = '';
        this.cuerpo = '';
        this.fechaActual = '';
        this.id_usuario = '';
        this.getNotas();
      },
      (error) => {
        console.error(error);
        spinner.style.display = 'none'; // Ocultar el spinner en caso de error
        this.notyf.error('Error al insertar nota');
        // Verificar si el error contiene un mensaje personalizado
        let errorMessage = "Error al registrar";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        // Mostrar el mensaje de error en el formulario

      }
    );
  }

  editarNota(): void {
    const url = environment.URL.notas + this.idNotaSeleccionada;

    const data = {
      titulo: this.nuevoTitulo,
      cuerpo: this.nuevoCuerpo,
      color: this.nuevoColor
    };
    console.log(data);

    const spinner = document.querySelector('.spinner2') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);
        this.notyf.success('Nota actualizada');
        this.getNotas()
      },
      (error) => {
        console.error(error);
        this.notyf.error('Error al atualizar la nota');
        spinner.style.display = 'none'; // Ocultar el spinner en caso de error
      }
    );
  }

  borrarNota(): void {
    const url = environment.URL.notas + 'borrar-notas/' + this.idNotaSeleccionada;

    const spinner = document.querySelector('.spinner2') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.notyf.success('Nota eliminada con exito');
        this.getNotas()
      },
      (error) => {
        console.error(error);
        this.notyf.success('Error al eliminar la nota');
        spinner.style.display = 'none'; // Ocultar el spinner en caso de error
      }
    );
  }


  enviarNota(userEmail: string, notaId: number): void {
    const data = {
      userEmail: userEmail,
      id_notas: notaId
    };
console.log(data)
    const url = environment.URL.notas + 'enviar-nota/' + this.idNotaSeleccionada;

    this.http.post(url, data).subscribe(
      (response: any) => {
        console.log('Nota enviada correctamente');
        this.notyf.success('Nota enviada con exito');
        this.getNotas();
        // Realiza cualquier acción adicional necesaria después de enviar la nota
      },
      (error: any) => {
        console.error('Error al enviar la nota:', error);
        this.notyf.error('Error al enviar la nota');
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }


  cambiarColor(nota: any) {
    // Aquí puedes realizar las operaciones necesarias para actualizar el color de fondo de la nota en tu backend
    nota.color = this.obtenerColorSeleccionado(); // Aquí debes obtener el color seleccionado desde el input de tipo "color"

    this.editarNota()
  }

  obtenerColorSeleccionado(): string {
    // Aquí puedes obtener el color seleccionado desde el input de tipo "color"
    // Por ejemplo, si tienes el ID del input como "colorSelector", puedes usar el siguiente código:
    const colorSelector = document.getElementById('colorSelector') as HTMLInputElement;
    return colorSelector.value;
  }



}
