import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl: string = environment.baseUrl

private _auth: Auth | undefined;

constructor(private http : HttpClient){
}


getusuario():Observable<Auth>{
return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  .pipe(
      tap( resp => this._auth = resp)
  )
}

get usuario(){
  return {...this._auth};
}

}
