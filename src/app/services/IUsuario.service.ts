import { Usuario } from '../model/usuario';

export interface IUsuarioService{

    /**
     * Función que indica a la guarda si el usuario está logeado o no
     */
    estaLogeado() : boolean;

    /**
     * Función que comprueba que exista el usuario
     * @param nombre del usuario
     * @param password constraseña del usuario
     * @return Usuario con datos si existe, undefined si no existe
     */
    login( nombre: string, password: string) : Usuario;

    cerrarSesion( idUsuario: number);

}