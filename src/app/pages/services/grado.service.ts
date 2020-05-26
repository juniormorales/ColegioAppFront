import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class GradoService {
  
    constructor(
      public http: HttpClient
    ) {}

    public listarGradosPorNivel(nivel){
        return this.http.post(environment.URL_SERVICIOSBACK + 'grado/listarPorNivel',nivel);
    }
}