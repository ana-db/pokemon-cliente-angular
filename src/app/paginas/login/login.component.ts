import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor( private builder: FormBuilder, 
                private usuarioService: UsuarioService, 
                private router: Router ) {
            //inyectamos UsuarioService para poder habilitar/deshabilitar el link de la zona privada
            // y Router para las rutas

    console.trace('LoginComponent constructor');
 
    //construimos formulario:
    this.formulario = this.builder.group({
      //definimos los FormControl == inputs [value, validaciones]
      nombre: ['admin', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      pass: ['admin123', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    }); //llaves y paréntesis porque tenemos un objeto

  }//fin constructor


  ngOnInit() {
    console.trace('LoginComponent ngOnInit');
  }//fin ngOnInit


  enviar( values: any ){
    console.trace('Enviar formulario %o', values);

    const nombre = values.nombre;
    const password = values.pass;
    const uLogeado = this.usuarioService.login(nombre, password);

    if( uLogeado ){
      console.trace('Usario logeado con exito %o', uLogeado);
      this.router.navigate(['backoffice']);
    }else{
      console.trace('Usario NO logeado');
      //TODO cambiar alert por mensaje al usuario
      alert('Por favor, intenta logearte de nuevo');
    }

  } //enviar

}//fin LoginComponent
