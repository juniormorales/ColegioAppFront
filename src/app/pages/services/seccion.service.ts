import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SeccionService{

    constructor(
        public http: HttpClient,
    ){}

    public listarSeccionPorNivel(nivel){
        return this.http.post(environment.URL_SERVICIOSBACK+'seccion/listarPorNivel',nivel).pipe(
            map( (resp:any)=>{
                return resp;
            })
            ,catchError( (err : HttpErrorResponse) => {
                console.log(err);
                Swal.fire('Error' + err.status + 'en el servicio' + '', err.message + ' ' + err.error.message, 'error');
                return Observable.throw(err);
            })
        );
    }
}