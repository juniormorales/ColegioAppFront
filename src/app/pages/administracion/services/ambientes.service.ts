import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbientesService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }

  
  public listar(){
    this.spinner.show();
    return this.http.get( environment.URL_SERVICIOSBACK + 'ambientes/listar').pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError( (err: HttpErrorResponse) => {
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

  public registrar(ambiente){
    this.spinner.show();
    return this.http.post( environment.URL_SERVICIOSBACK + 'ambientes/registrar',ambiente).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError( (err: HttpErrorResponse) => {
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

  public actualizar(ambiente){
    this.spinner.show();
    return this.http.put( environment.URL_SERVICIOSBACK + 'ambientes/actualizar',ambiente).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError( (err: HttpErrorResponse) => {
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

  public eliminar(id){
    this.spinner.show();
    return this.http.delete( environment.URL_SERVICIOSBACK + 'ambientes/eliminar/'+id).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError( (err: HttpErrorResponse) => {
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
