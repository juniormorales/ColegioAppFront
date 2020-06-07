import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }
  

  public listar(){
    this.spinner.show();
    return this.http.get( environment.URL_SERVICIOSBACK + 'turno/listar').pipe(
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
    return this.http.post( environment.URL_SERVICIOSBACK + 'turno/registrar',turno).pipe(
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
    return this.http.put( environment.URL_SERVICIOSBACK + 'turno/actualizar',turno).pipe(
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
    return this.http.delete( environment.URL_SERVICIOSBACK + 'turno/eliminar/'+id).pipe(
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
