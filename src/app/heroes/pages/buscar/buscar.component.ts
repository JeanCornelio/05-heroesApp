import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    .container{
      display: flex;
      justify-content: center; 
    }
  `]
})
export class BuscarComponent implements OnInit {
  
  termino: string = "";
  heroes: Heroe[] =[];
  heroeSeleccionado!: Heroe; 
  constructor( private heresServices: HeroesService) { }

  ngOnInit(): void {
  }

  buscar(){
    this.heresServices.getSugerencias( this.termino.trim() ).subscribe( heroes => this.heroes = heroes);
  }

  opcionSeleccionada(e:MatAutocompleteSelectedEvent){

    if(!e.option.value){
      this.heroeSeleccionado = undefined!;
      return
    };
    const heroe: Heroe = e.option.value;
    this.termino = heroe.superhero;

    this.heresServices.getHereoePorId( heroe.id! )
      .subscribe(heroe => this.heroeSeleccionado = heroe ); 
  }



}
