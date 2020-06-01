import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class SeccionService{

    constructor(
        public http: HttpClient,
        public spinner: NgxSpinnerService
    ){}

    public listarSeccionPorNivel(nivel){
        this.spinner.show();
        return this.http.post(environment.URL_SERVICIOSBACK+'seccion/listarPorNivel',nivel).pipe(
            map( (resp:any)=>{
                this.spinner.hide();
                return resp;
            })
            ,catchError( (err : HttpErrorResponse) => {
                this.spinner.hide();
                if(err.status ==0 ){
                    Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
                }else{
                    Swal.fire('Error ' + err.status + ' '+ err.error.mensaje,  'Detalles: '+err.error.error, 'error');
                }
                return Observable.throw(err);
            })
            
        );
    }
}