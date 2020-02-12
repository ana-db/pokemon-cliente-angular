import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
];


export const RUTAS =  [
  {
    'ruta' : '/',
    'nombre' : 'Inicio'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
