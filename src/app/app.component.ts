import { Component } from '@angular/core';
import { GLOBAL } from '../app/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pokemon-cliente-angular';
  global: any;

  constructor() {
    console.trace('AppComponent constructor');        
    this.global = GLOBAL; 
  } //fin constructor

}//fin AppComponent
