import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  //para poder redireccionar al usuario, necesitamos inyectarlo en el constructor
  constructor( private router : Router, private usuarioService: UsuarioService){
    console.debug('LoginGuard constructor');
  }//fin constructor


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.debug('LoginGuard canActivate');

    const logeado: boolean = this.usuarioService.estaLogeado();

    if( !logeado ){
      this.router.navigate(['login']); //si el usurio no tiene permisos, le redireccionamos al login
    }

    return logeado; //si el usuario no se ha logeado, devuelve un false y no podremos entrar en el backoffice
  }// fin canActivate
  
}
