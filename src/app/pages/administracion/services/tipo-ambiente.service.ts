import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class TipoAmbienteService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }
  

  public listar(){
    this.spinner.show();
    return this.http.get( environment.URL_SERVICIOSBACK + 'tipoAmbiente/listar').pipe(
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

  public registrar(tipo){
    this.spinner.show();
    return this.http.post( environment.URL_SERVICIOSBACK + 'tipoAmbiente/registrar',tipo).pipe(
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

  public actualizar(tipo){
    this.spinner.show();
    return this.http.put( environment.URL_SERVICIOSBACK + 'tipoAmbiente/actualizar',tipo).pipe(
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
