import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { NotasComponent } from './notas/notas.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from 'src/AuthGuard';

const routes: Routes = [{
  path: '',
  component: InicioComponent,
},
{
  path: 'inicioSesion',
  component: InicioSesionComponent,
},
{
  path: 'mensajes',
  component: MensajesComponent,
  canActivate: [AuthGuard]
},
{
  path: 'notas',
  component: NotasComponent,
  canActivate: [AuthGuard]
},
{
  path: 'registro',
  component: RegistroComponent,
},
{
  path: 'conocenos',
  component: ConocenosComponent,
},
{
  path: 'privacidad',
  component: PrivacidadComponent,
},
{
  path: 'nuestros-servicios',
  component: NuestrosServiciosComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
