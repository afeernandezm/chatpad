import { NotasComponent } from './notas/notas.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    MensajesComponent,
    InicioComponent,
    ConocenosComponent,
    NuestrosServiciosComponent,
    PrivacidadComponent,
    RegistroComponent,
    InicioSesionComponent,
    NotasComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
