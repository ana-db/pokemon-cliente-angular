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
  pokemonSeleccionado: Pokemon;
  mensaje: string;

  constructor( private pokemonService: PokemonService ) { 

    console.trace('BackofficeComponent constructor');

    this.pokemons = new Array<Pokemon>();
    this.pokemonSeleccionado = new Pokemon('');
    this.nombreNuevo = '';

  }

  ngOnInit() {
    console.trace('BackofficeComponent ngOnInit');


    this.pokemonService.getAll().subscribe( 
      data => {
          console.debug('Petición correcta data o%', data); 
          this.pokemons = data; 
          this.pokemonSeleccionado = this.pokemons[0];
          console.trace('pokemons ngOnInit %o', this.pokemons);           
      },
      error => {
          console.warn('Petición errónea data o%', error);
          this.mensaje = 'No existe el Pokemon';
      },
      () => {
          console.trace('Esto se hace siempre, tanto si funciona como si hay un error');
      }
    ); //fin llamada a getAll() con pokemonService
  }


  liberarPokemon(pokemon: Pokemon){

    console.debug('Click liberar pokemon %o', pokemon);

    if( confirm('¿Estás seguro de que quieres liberar este pokemon?') ){
      console.trace('Eliminación confirmada');
      
      this.pokemonService.freePokemon(pokemon.id).subscribe( () =>{
        this.mensaje = 'Has liberado el pokemon';
      } ); 
    }else{
      console.trace('Eliminación cancelada');
    } 

  } //fin liberarPokemon



  crearPokemon(pokemon: Pokemon){

    console.debug('Click crear pokemon %o', pokemon);

    //creamos un objeto pokemon nuevo:
    const pokemonNuevo = new Pokemon("");
    
    if ( this.nombreNuevo.trim().length > 1){
      pokemonNuevo.nombre = this.nombreNuevo;
      console.debug('Pokemon nuevo %o', pokemonNuevo);

      this.pokemonService.createPokemon(pokemonNuevo).subscribe( datos => {
        console.debug('Nuevo pokemon creado en json-server %o', datos);
        this.nombreNuevo = ''; //limpiamos input text
//        this.cargarTareas();

        this.mensaje = 'Has creado un nuevo pokemon '; /*
        this.idTareaMensaje = `id ${datos.id} `;
        this.tituloTareaMensaje = `y titulo ${datos.titulo}`;
        this.showMensaje = true; */
      });
    }else{
      this.mensaje = 'El nombre del pokemon no es válido, debe contener al menos 2 caracteres';
    } 

  }//fin crearPokemon


}//fin BackofficeComponent
