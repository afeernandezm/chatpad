import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: string | null = null;
  constructor(private router: Router) {
    this.usuario="";
  }



  ngOnInit() {
    // Verificar si hay un usuario en el Local Storage
    const usuarioLocalStorage = localStorage.getItem('usuario');

    if (usuarioLocalStorage) {
      this.usuario = usuarioLocalStorage;
    }


    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.nombre) {
      this.usuario = usuario.nombre;
      console.log(this.usuario)
    } else {
      console.log("No hay usuarios registrados");
    }
  }
  irAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    // Eliminar el usuario del Local Storage
    localStorage.removeItem('usuario');
    this.usuario = null;
    // Redirigir a la página de inicio de sesión u otra página
    this.irAPagina('/inicioSesion');
  }
}


