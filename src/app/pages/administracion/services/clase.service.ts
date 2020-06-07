import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }

  public listarClases(){
    this.spinner.show();
    return this.http.get( environment.URL_SERVICIOSBACK + 'clases/listar').pipe(
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

  public registrar(turno){
    this.spinner.show();
    return this.http.post( environment.URL_SERVICIOSBACK + 'clases/registrar',turno).pipe(
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

  public actualizar(turno){
    this.spinner.show();
    return this.http.put( environment.URL_SERVICIOSBACK + 'clases/actualizar',turno).pipe(
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
    return this.http.delete( environment.URL_SERVICIOSBACK + 'clases/eliminar/'+id).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError( (err: HttpErrorResponse) => {
        this.spinner.hide();
            if(err.status ==0 ){
                Swal.fire('Error',environment.msg_servicio_no_disponible,'error')
            }else{
                Swal.fire(err.error.mensaje,  'Detalles: '+err.error.error, 'error');
            }
            return Observable.throw(err);
      })
    );
  }
}
