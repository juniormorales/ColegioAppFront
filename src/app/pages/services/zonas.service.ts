import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }

  listarDepartamentos(){
    this.spinner.show();
    return this.http.get(environment.URL_SERVICIOSBACK + 'departamento/listar').pipe(
        map(resp => {
            this.spinner.hide();
            return resp;
        })
        ,catchError((err: HttpErrorResponse) => {
            this.spinner.hide();
            if(err.status ==0 ){
                Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
            }else{
                Swal.fire('Error ' + err.status + ' '+ err.error.mensaje,  'Detalles: '+err.error.error, 'error');
            }
            return Observable.throw(err);
        })); 
  }

  listarProvincias(dep){
    this.spinner.show();
    return this.http.post(environment.URL_SERVICIOSBACK + 'provincia/porDepartamento',dep).pipe(
        map(resp => {
            this.spinner.hide();
            return resp;
        })
        ,catchError((err: HttpErrorResponse) => {
            this.spinner.hide();
            console.log(err)

            if(err.status ==0 ){
                Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
            }else{
                Swal.fire('Error ' + err.status + ' '+ err.error.mensaje,  'Detalles: '+err.error.error, 'error');
            }
            return Observable.throw(err);
        })); 
  }

  listarDistritos(prov){
    this.spinner.show();
    return this.http.post(environment.URL_SERVICIOSBACK + 'distrito/porProvincia',prov).pipe(
        map(resp => {
            this.spinner.hide();
            return resp;
        })
        ,catchError((err: HttpErrorResponse) => {
            this.spinner.hide();
            if(err.status ==0 ){
                Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
            }else{
                Swal.fire('Error ' + err.status + ' '+ err.error.mensaje,  'Detalles: '+err.error.error, 'error');
            }
            return Observable.throw(err);
        })); 
  }

  listarTipoZona(){
    this.spinner.show();
    return this.http.get(environment.URL_SERVICIOSBACK + 'tipoZona/listar').pipe(
        map(resp => {
            this.spinner.hide();
            return resp;
        })
        ,catchError((err: HttpErrorResponse) => {
            this.spinner.hide();
            if(err.status ==0 ){
                Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
            }else{
                Swal.fire('Error ' + err.status + ' '+ err.error.mensaje,  'Detalles: '+err.error.error, 'error');
            }
            return Observable.throw(err);
        })); 
  }
}
