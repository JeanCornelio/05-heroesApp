import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {BreakpointObserver, LayoutModule} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin:10px;
}`]
})
export class HomeComponent implements  AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor( private observer: BreakpointObserver) { }
  
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
  

}
