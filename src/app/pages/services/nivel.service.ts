import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class NivelService {
  
    constructor(
      public http: HttpClient
    ) { }

    public listarNiveles(){
        return this.http.get(environment.URL_SERVICIOSBACK + 'nivel/listar');
    }
}