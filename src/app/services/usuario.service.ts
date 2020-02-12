import { Injectable } from '@angular/core';
import { IUsuarioService } from './IUsuario.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService{

  private isLogged: boolean;
  private usuario: Usuario;


  constructor() { 
    console.trace('UsuarioService constructor');
    this.isLogged = false;
    this.usuario = undefined; 
  }//fin constructor


  estaLogeado(): boolean {
    console.trace('UsuarioService estaLogeado');
    return this.isLogged;
  }//fin estaLogeado


  /**
   * Busca el usuario por nombre y password
   * @param nombre del usuario que intenta logearse
   * @param password del usuario que intenta logearse
   * @return Usuario con datos si existe, undefined si no encuentra
   */
  login(nombre: string, password: string): Usuario {

    console.trace('UsuarioService login nombre %s y password %s', nombre, password);

    const NOMBRE = 'admin';
    const PASS = 'admin123';
    let usuarioBuscar: Usuario; //si no entra en el if es undefined

    //si las credenciales del usuario coinciden con NOMBRE y PASS, está logeado y puede entrar al backoffice
    if( NOMBRE === nombre && PASS === password ){
      console.trace('usuario encontrado');
      usuarioBuscar = new Usuario();
      usuarioBuscar.nombre= nombre;
      usuarioBuscar.password = password;
      usuarioBuscar.id = 99;
      //marcar que está logeado:
      this.isLogged = true;
    }else{
      console.trace('usuario NO encontrado');
      this.isLogged = false;
    }

    return usuarioBuscar; 

  }//fin login


  cerrarSesion() {
    console.trace('UsuarioService cerrarSesion');
    this.isLogged = false;
  }

  
}//fin UsuarioService
