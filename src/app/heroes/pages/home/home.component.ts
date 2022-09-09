import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {BreakpointObserver, LayoutModule} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from 'src/app/auth/interfaces/auth.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin:10px;
}`]
})
export class HomeComponent implements  AfterViewInit {


//utilizo get para obtener el usuario enviado desde el servicio y poder mostrarlo en el html
get auth(){
  return this.authService.usuario
}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor( private observer: BreakpointObserver,
               private router: Router,
               private authService: AuthService) { }
  
  ngAfterViewInit() {
    setTimeout(()=>{
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'push';
          this.sidenav.close();
        }
      });
    },0)
 
  }
  
  logout(){
    this.router.navigate(['/auth/login'])
  }
 
}
