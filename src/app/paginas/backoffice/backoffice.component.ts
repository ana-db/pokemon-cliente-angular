import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons : Array<Pokemon>;
  nombreNuevo: string;
  imagenNueva: string;
  pokemonSeleccionado: Pokemon;
  mensaje: string;
  showMensaje: boolean;

  constructor( private pokemonService: PokemonService ) { 

    console.trace('BackofficeComponent constructor');

    this.pokemons = new Array<Pokemon>();
    this.pokemonSeleccionado = new Pokemon('');
    this.nombreNuevo = '';
    this.imagenNueva = '';

    this.mensaje = '';
    this.showMensaje = false;

  }

  ngOnInit() {
    console.trace('BackofficeComponent ngOnInit');

    //en ngOnInit llamamos al service para obtener la lista de todos los pokemon:
    this.cargarPokemons();

  }


  /**
   * Llama al servicio para cargar todos los pokemon
   * Nos va a servir para refrescar la lista de pokemon
   */
  private cargarPokemons(): void{ //no devuelve nada

    console.trace('cargarPokemons');

    //llamamos al service para obtener pokemon:
    this.pokemonService.getAll().subscribe( 
      data => {
          console.debug('Petición correcta data o%', data); 
          this.pokemons = data; 
          this.pokemonSeleccionado = this.pokemons[0];
          console.trace('pokemons ngOnInit %o', this.pokemons);           
      },
      error => {
          console.warn('Petición errónea data o%', error);
          this.mensaje = 'Error de conexión: el servicio rest no funciona. Posiblemente no esté arrancado';
          this.showMensaje = true;
      }
    ); //fin llamada a getAll() con pokemonService

  } //fin cargarTareas


  eliminarPokemon(pokemon: Pokemon){

    console.debug('Click liberar pokemon %o', pokemon);

    if( confirm('¿Estás seguro de que quieres liberar este pokemon?') ){
      console.trace('Eliminación confirmada');
      
      this.pokemonService.eliminar(pokemon.id).subscribe( () =>{
        this.mensaje = 'Has eliminado el pokemon';
        this.showMensaje = true;
        this.cargarPokemons();
      } ); 
    }else{
      console.trace('Eliminación cancelada');
    } 

  } //fin liberarPokemon



  crearPokemon(pokemon: Pokemon){

    console.debug('Click crear pokemon %o', pokemon);

    //creamos un objeto pokemon nuevo:
    const pokemonNuevo = new Pokemon(this.nombreNuevo);
    
    if ( this.nombreNuevo.trim().length > 1){
      pokemonNuevo.nombre = this.nombreNuevo;
      pokemonNuevo.imagen = this.imagenNueva;
      console.debug('Pokemon nuevo %o', pokemonNuevo);

      this.pokemonService.crear(pokemonNuevo).subscribe( datos => {
        console.debug('Nuevo pokemon creado en json-server %o', datos);
        this.nombreNuevo = ''; //limpiamos input text
        this.imagenNueva = '';
        this.cargarPokemons();

        this.mensaje = 'Has creado un nuevo pokemon '; 
        this.showMensaje = true;  
        /* this.idTareaMensaje = `id ${datos.id} `;
        this.tituloTareaMensaje = `y titulo ${datos.titulo}`; */
      });
    }else{
      this.mensaje = 'El nombre del pokemon no es válido, debe contener al menos 2 caracteres';
    } 

  }//fin crearPokemon


}//fin BackofficeComponent
