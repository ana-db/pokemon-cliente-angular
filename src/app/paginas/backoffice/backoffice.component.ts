import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


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
  idPokemonMensaje: string; 
  nombrePokemonMensaje: string;
  tipoAlert: string;

  formulario: FormGroup;

  isCrear: boolean;

  //gestionamos habilidades:
  habilidades: Array<any>;
  formHabilidades: FormArray;

  options = [
    {nombre: 'impasible', id: '1', checked: false},
    {nombre: 'rayos', id: '2', checked: false},
    {nombre: 'oloroso', id: '3', checked: false}
  ];

  // map habilidades del serviucio rest a options para checks
  /* this.habilidades.map ( el => {
                                    nombre: el.nombre,
                                    id: el.id,
                                    checked: false
                                  });
  */


  constructor( private pokemonService: PokemonService, private builder: FormBuilder ) { 

    console.trace('BackofficeComponent constructor');

    this.pokemons = new Array<Pokemon>();
    this.pokemonSeleccionado = new Pokemon('');
    this.nombreNuevo = '';
    this.imagenNueva = '';

    this.mensaje = '';//{"texto":"","tipo":"alert-danger"}
    this.showMensaje = false;
    this.idPokemonMensaje = '';
    this.nombrePokemonMensaje = '';
    this.tipoAlert = 'primary';

    //construimos formulario con la función crearFormulario() para hacerlo más claro:
    this.crearFormulario();
    /*
    this.formulario = this.builder.group({
      //definimos los FormControl == inputs [value, validaciones]
      nombreNuevo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      imagenNueva: ['', [Validators.required, Validators.maxLength(150)]],
      id: ['0'],
    }); //llaves y paréntesis porque tenemos un objeto
    */

    this.isCrear = false;

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
          this.tipoAlert = 'danger';
          this.showMensaje = true;
      }
    ); //fin llamada a getAll() con pokemonService

  } //fin cargarPokemons


  //////////////////// crear formulario con array habilidades ////////////////////
  private crearFormulario() {

    this.formulario = this.builder.group({
      id: new FormControl(0),
      nombreNuevo: new FormControl('',
                              Validators.compose(
                                  [
                                    Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(50)
                                  ])
                              ),
      imagenNueva: ['', [Validators.required, Validators.maxLength(150)]],
      habilidades:  this.builder.array( [], // creamos array sin habilidades
                                  // [ this.crearFormGroupHabilidad() ] <- meter habilidades segun se contruye
                                  Validators.compose(
                                    [
                                      Validators.required,
                                      Validators.minLength(1)
                                    ])
                                )
    });//llaves y paréntesis porque tenemos un objeto

    this.formHabilidades = this.formulario.get('habilidades') as FormArray;

  }// crearFormulario


  private crearFormGroupHabilidad(): FormGroup {
    return this.builder.group({
              id: new FormControl(0),
              nombre: new FormControl('')
            });
  }


  checkCambiado( option: any ) {

    option.checked = !option.checked;          // TODO ver porque no cambia el valor del check sin esta linea
    console.debug('checkCambiado %o', option);

    const habilidad = this.crearFormGroupHabilidad();
    habilidad.get('id').setValue( option.id );
    habilidad.get('nombre').setValue( option.nombre );

    if( option.checked == true ){
      console.log('BackofficeComponent checkCambiado, se añade otra habilidad '); 
      this.formHabilidades.push(habilidad);
    }else{
      console.log('BackofficeComponent checkCambiado, se quita una habilidad '); 
      if( this.formHabilidades.length > 1 ){    
        this.formHabilidades.removeAt( this.formHabilidades.value.findIndex(el => el.id === option.id) );
      } 
    }
    

  }// checkCambiado

  //////////////////// fin crear formulario con array habilidades ////////////////////

  eliminarPokemon(pokemon: Pokemon){

    console.debug('Click liberar pokemon %o', pokemon);

    if( confirm('¿Estás seguro de que quieres liberar este pokemon?') ){
      console.trace('Eliminación confirmada');
      
      this.pokemonService.eliminar(pokemon.id).subscribe( () =>{
        this.mensaje = 'Has eliminado el pokemon con ';
        this.idPokemonMensaje = `id ${pokemon.id} `;
        this.nombrePokemonMensaje = `y nombre ${pokemon.nombre}`;
        this.tipoAlert = 'success';
        this.showMensaje = true;
        this.cargarPokemons();
      } ); 
    }else{
      console.trace('Eliminación cancelada');
    } 

  } //fin eliminarPokemon


  ////////////////////////////// 17/02/2020 formulario reactivo //////////////////////////////
  enviar( values: any ){

    console.trace('Enviar formulario %o', values);

    const nombreNuevo = values.nombreNuevo;
    const imagenNueva = values.imagenNueva;
    const id = values.id;
    const habilidades = values.habilidades; //array con habilidades
    
    //creamos un objeto pokemon nuevo:
    const pokemonNuevo = new Pokemon(nombreNuevo);

    console.trace('Empezamos a crear un nuevo pokemon %o', pokemonNuevo);

    if ( nombreNuevo.trim().length > 1){

      pokemonNuevo.id = id;
      pokemonNuevo.nombre = nombreNuevo;
      pokemonNuevo.imagen = imagenNueva;
      pokemonNuevo.habilidades = habilidades; //array con habilidades
      console.debug('Pokemon nuevo %o', pokemonNuevo);

      if(id == 0){ //CREAMOS
        this.pokemonService.crear(pokemonNuevo).subscribe( datos => {
            console.debug('Nuevo pokemon creado en json-server %o', datos);
            this.inicializarNuevo(); //inicializamos el formulario a 0 para limpiarlo
            this.cargarPokemons();
    
            this.mensaje = 'Has creado un nuevo pokemon con '; 
            this.idPokemonMensaje = `id ${datos.id} `;
            this.nombrePokemonMensaje = `y nombre ${datos.nombre}`;
            this.tipoAlert = 'success';
            this.showMensaje = true;  
          },
          (error) => {
            console.debug('Error %o', error);
            if(error.status == 400){
              /* con las siguientes 2 líneas corregimos el bug: 
              this.pokemonSeleccionado = undefined; y this.cargarPokemons();
              sin ellas, si el nombre del pokemon estaba repetido en la bd, salía el mensaje de error
              pero la aplicación se quedaba bloqueada, dejaba de hacer las operaciones de crud */
              this.pokemonSeleccionado = undefined;
              this.cargarPokemons();

              this.mensaje = 'El nombre ya existe en la base de datos, por favor elige otro';
              this.idPokemonMensaje = ` `;
              this.nombrePokemonMensaje = ` `;
              this.tipoAlert = 'danger';
              this.showMensaje = true; 
            }
          }
        );
      }else{ //MODIFICAMOS 
        console.trace('Empezamos a editar el pokemon %o',pokemonNuevo);
        
        this.pokemonService.modificar(pokemonNuevo).subscribe( datos => {
            console.debug('Pokemon editado en json-server %o', datos);
            //this.cargarPokemonFormulario(pokemonNuevo); //this.inicializarNuevo(); //inicializamos el formulario a 0 para limpiarlo
            this.cargarPokemons();

            this.mensaje = 'Se ha modificado correctamente el pokemon con '; 
            this.idPokemonMensaje = `id ${datos.id} `;
            this.nombrePokemonMensaje = ` `;
            this.tipoAlert = 'success';
            this.showMensaje = true;  
          },
          (error) => {
            console.debug('Error %o', error);
            if(error.status == 400){
              this.pokemonSeleccionado = undefined;
              this.cargarPokemons();

              this.mensaje = 'El nombre ya existe en la base de datos, por favor elige otro';
              this.idPokemonMensaje = ` `;
              this.nombrePokemonMensaje = ` `;
              this.tipoAlert = 'danger';
              this.showMensaje = true; 
            }
          }
        );
      }
    }else{
      this.mensaje = 'El nombre del pokemon no es válido, debe contener al menos 2 caracteres';
      this.idPokemonMensaje = ` `;
      this.nombrePokemonMensaje = ` `;
      this.tipoAlert = 'danger';
      this.showMensaje = true;  
    } 
    
  } //enviar


  /**
   * Función que carga los datos de un pokemon dinámicamente en el formulario para editarlos
   * @param pokemon 
   */
  cargarPokemonFormulario = function(pokemon: Pokemon){
    
    console.debug('Se cargan en el formulario los datos de %o', pokemon);

    this.pokemonSeleccionado = pokemon;
    
    const controlId = this.formulario.get('id');
    controlId.setValue( pokemon.id );

    const controlNombre = this.formulario.get('nombreNuevo');
    controlNombre.setValue( pokemon.nombre );

    const controlImagen = this.formulario.get('imagenNueva');
    controlImagen.setValue( pokemon.imagen );

    this.isCrear = false;
    
  }//fin cargarPokemonFormulario


  /**
   * Función que inicializa los datos del formulario a 0 para que el usuario los rellene
   */
  inicializarNuevo = function(){
    console.debug('Se inicializan los datos para crear nuevo pokemon en el formulario');

    const controlId = this.formulario.get('id');
    controlId.setValue( 0 );

    const controlNombre = this.formulario.get('nombreNuevo');
    controlNombre.setValue('');

    const controlImagen = this.formulario.get('imagenNueva');
    controlImagen.setValue('');

    this.isCrear = true;

  }//fin inicializarNuevo


}//fin BackofficeComponent
