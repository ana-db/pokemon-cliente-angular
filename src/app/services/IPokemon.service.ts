import { Observable } from "rxjs";

export interface IPokemonService {

    getAll(): Observable<any>;

    getById( idPokemon: number ); 

    getByName( idPokemon: string );

    /**
     * Recuperamos los datos en JSON de un Pokemon por su nombre
     * @param nombre : string nombre del Pokemon a buscar
     * @see GET /api/v2/pokemon/{nombre}/
     */
    getPokemon(nombre: string): Observable<any>;

    /**
     * Recupera un JSON con las caracteristicas de un Pokemon
     * @param nombreHabilidad : nombre de la habilidad del pokemon en inglés
     * @see GET /api/v2/characteristic/{name}/
     */
    getHabilidad(nombreHabilidad: number): Observable<any>;


}