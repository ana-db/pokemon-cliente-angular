import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './paginas/login/login.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  //vamos a porteger esta ruta con una guarda:
  {path: 'backoffice', component: BackofficeComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: InicioComponent} //se redirige a esta pagina si hay algún error y no encuentra la pagina
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
