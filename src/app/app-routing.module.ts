import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageoComponent } from './shared/error-pageo/error-pageo.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    //canLoad: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageoComponent
  },
  
  {
    path: '**',
    redirectTo: '404'
  }
] 


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
