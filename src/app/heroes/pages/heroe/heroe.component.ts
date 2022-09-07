import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
     img{width:50%;}
    .container{margin: 10px}
    .heroe-img{text-align: center}

    @media (max-width:600px){
      img{width:100%;}
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe! : Heroe;
  constructor( private route: ActivatedRoute,
               private heroesServices: HeroesService,
               private router: Router) { }

  ngOnInit(): void {
    // recibimos el objeto de id: id de heroe y con la destructuracion de objetos podemos obtener las proprs del heroe  { id }
    this.route.params.pipe(
      switchMap( ({ id })=> this.heroesServices.getHereoePorId(id)))
        .subscribe( heroe => this.heroe = heroe )
    
  }


  regresar(): void{
    this.router.navigate(['/heroes/listado']);
  }
}
