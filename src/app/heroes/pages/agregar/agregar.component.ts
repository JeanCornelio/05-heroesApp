
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfirarComponent } from '../../components/confirar/confirar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
            img{
              width:50%;
              border-radius: 5px
            }
            .container{
              display: flex;
              justify-content: center; 
            }
            @media (max-width:900px){
              img{width:80%;}
            }

            @media (max-width:600px){
          img{width:100%;}
            }
         `]
})
export class AgregarComponent implements OnInit {



  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

   

  constructor(private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit(): void {
   
    if(!this.router.url.includes('editar')){ return };
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHereoePorId(id)))
      .subscribe(heroe => {
        this.heroe = heroe
      });
   
 
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) { return }
    if (this.heroe.alter_ego.trim().length === 0) { return }
    if (this.heroe.first_appearance.trim().length === 0) { return }
    if (this.heroe.characters.trim().length === 0) { return }
    //Valido si el Registro tiene un Id
    if (this.heroe.id) {
      //Editar
      this.heroesService.updateHeroe(this.heroe)
        .subscribe(resp => this.mostrarSnakbar('Registro Actualizado'))
    } else {
      //Crear
      this.heroesService.addHeroe(this.heroe)
        .subscribe({
          next: (heroe) => {
            this.router.navigate(['/heroes/editar', heroe.id]);
            this.mostrarSnakbar('Registro Creado');
          }
        })
    }
  }


  deleteHeroe(){
    const dialog = this.dialog.open(ConfirarComponent,{
      data: this.heroe
    });
 
    dialog.afterClosed()
      .pipe( switchMap( (resp)=> (resp)? this.heroesService.deleteHeroe( this.heroe.id! ):'')) 
        .subscribe({
        next:(resp)=>{
          this.router.navigate(['/heroes/']);
        }
      }) 
  }

  mostrarSnakbar( mensaje:string):void {
   this.snackBar.open( mensaje, 'Ok!', {
    duration:2500,
    verticalPosition:'top'
   } ) 
  }
 
}
