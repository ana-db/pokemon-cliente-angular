import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {

  transform(pokemons: any, busqueda: string): any {

    console.trace('---------- empieza pipe ----------');
    console.debug('pokemons', pokemons); //contenido del array
    console.debug('busqueda', busqueda); //elementos por los que filtramos: nombre del pokemon
    console.trace('---------- termina pipe ----------');

    let resultado = pokemons;

    //2) filtrar por NOMBRE del pokemon:
    if( busqueda && '' !== busqueda ){ 

      busqueda = busqueda.toLowerCase();

      resultado = resultado.filter( (el) => {
        const encontrar = (el.nombre).toLowerCase(); //queremos buscar el pokemon por su nombre, lo pasamos a minúsculas
        console.debug('encontrar', encontrar);
        return encontrar.includes(busqueda);  //includes indica si la cadena que tenemos guardada en "busqueda" está en "encontrar", si es asi, lo guarda en resultado para mostrarlo por pantalla
      });

    }

    return resultado;

  }//fin transform

}//fin PokemonPipe
