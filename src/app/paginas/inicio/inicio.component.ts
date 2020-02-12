import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { POKEMONS } from '../../pokemons'
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  title: string;
  pokemons : Array<any>;
  pokemon: Pokemon;
  pokemonSeleccionado: Array<any>;
  habilidadesPokemon: Array<any>;
  mensaje: String;

  constructor( private pokemonService: PokemonService ) { //inyectamos el servicio pokemon

    console.trace('InicioComponent constructor');

    this.title = 'Servicio REST Pokemon con cliente Angular';
    this.pokemons = [];//this.pokemons = POKEMONS;
    this.pokemon = new Pokemon('');
    this.pokemonSeleccionado = this.pokemons[0]; 
    this.habilidadesPokemon = [];
    this.mensaje = '';

  } //fin constructor

  
  ngOnInit() {

    console.trace('InicioComponent ngOnInit');

    //llamadas a los servicios

    //a un observable nos tenemos que suscribir
    //cuando llamamos a un observable tenemos 3 posibles métodos y sólo 1 es obligatorio: 
    //1. cuando todo va bien, 2. cuando falla, 3. siempre
    
    this.pokemonService.getAll().subscribe( 
      data => {
          console.debug('Petición correcta data o%', data); 
          this.pokemons = data; /* tenemos directamente todos los datos que necesitamos
                                  no tenemos que hacer más llamadas para recoger otros datos porque data 
                                  los tiene todos, con asignarlos al array de pokemos ya está
                                */
          this.habilidadesPokemon = this.pokemons.map( el => el.habilidades );                   
          this.mensaje = 'Lista de Pokemon cargada correctamente desde http://localhost:8080/pokemon-rest/api/pokemon/';   
      },
      error => {
          console.warn('Petición errónea data o%', error);
          this.mensaje = 'No existe el Pokemon';
      },
      () => {
          console.trace('Esto se hace siempre, tanto si funciona como si hay un error');
      }
    ); //fin llamada a getAll() con pokemonService

  } //fin ngOnInit


  //función para seleccionar una fruta y sacar su detalle: 
  seleccionarPokemon = function(pokemon){
    console.log('Hemos hecho click en el pokemon %o', pokemon ); 
    this.pokemonSeleccionado = pokemon;
  }


} //InicioComponent
