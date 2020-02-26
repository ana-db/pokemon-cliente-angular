import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //relacionado con la programación reactiva
import { IPokemonService } from './IPokemon.service';
import { Pokemon } from '../model/pokemon';
import { environment } from "../../environments/environment" 
//utilizamos un endpoint distinto si estamos en desarrollo o producción


@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {

  endpoint = environment.endpoint;
  /* si estamos en desarrollo, endpoint = "http://localhost:8080/pokemon-rest/"
     si estamos en producción, endpoint = "http://192.168.0.50:8080/pokemon-rest-ana/"
     angular se encarga de hacer el cambio cuando hacemos ng build --prod (ng build --prod --base-href=/pokemon-angular-ana/)
  */
  
  constructor( private http: HttpClient ) { 
    console.trace('PokemonService constructor');
  }//fin constructor


  getAll(): Observable<any> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    const url = this.endpoint + `api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url); //devuelve un objeto de tipo observable: hace una llamada, observa y en algún momento devuelve los datos
  }//fin getAllPokemon


  getPokemon( nombre: string): Observable<any> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/${nombre}/`;
    const url = this.endpoint + `api/pokemon/${nombre}`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url); 
  }


  getHabilidad(nombreHabilidad: number): Observable<any> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/${nombreHabilidad}/`;
    const url = this.endpoint + `api/pokemon/${nombreHabilidad}/`;
    console.trace('PokemonService getHabilidad ' + url);
    return this.http.get(url); 
  }


  getById(idPokemon: number) {
    throw new Error("Method not implemented.");
  }
  getByName(idPokemon: string) {
    throw new Error("Method not implemented.");
  }


  eliminar(id: number): Observable<Pokemon> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    const url = this.endpoint + `api/pokemon/${id}`;
    console.debug('DELETE %s eliminar', url);
    return this.http.delete<Pokemon>(url);
  } //fin eliminar


  crear(pokemon: Pokemon): Observable<Pokemon> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    const url = this.endpoint + `api/pokemon/`;
    console.debug('POST %s crear pokemon %o ', url, pokemon); //%s string, %o objeto
    return this.http.post<Pokemon>(url, pokemon);
  } //fin crear


  modificar(pokemon: Pokemon): Observable<Pokemon> {
    //const url = `http://localhost:8080/pokemon-rest/api/pokemon/${pokemon.id}`;
    const url = this.endpoint + `api/pokemon/${pokemon.id}`;
    console.debug('PUT %s modificar pokemon %o ', url, pokemon); //%s string, %o objeto
    return this.http.put<Pokemon>(url, pokemon);
  } //fin modificar


  getAllHabilidades(): Observable<any> {
    //const url = `http://localhost:8080/pokemon-rest/habilidad/`;
    const url = this.endpoint + `habilidad/`;
    console.trace('PokemonService getAllHabilidades ' + url);
    return this.http.get(url); //devuelve un objeto de tipo observable: hace una llamada, observa y en algún momento devuelve los datos
  }//fin getAllPokemon

} //fin PokemonService
