import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
  })
export class AlumnoService{

    constructor(
        public http: HttpClient,
        public spinner: NgxSpinnerService
    ){}

    public listarAlumnos(){
        this.spinner.show();
        return this.http.get(environment.URL_SERVICIOSBACK + 'alumno/listar').pipe(
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

    public registrarAlumno(alumno){
        this.spinner.show();
        return this.http.post(environment.URL_SERVICIOSBACK + 'alumno/registrar',alumno).pipe(
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

    public subirImagenAlumno(archivo: File, id){
        this.spinner.show();
        let formData = new FormData();
        formData.append("archivo",archivo);
        formData.append("id",id);
        return this.http.post(environment.URL_SERVICIOSBACK+ "alumno/uploadImage",formData).pipe(
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

    public  verFoto(nombre){
       return environment.URL_SERVICIOSBACK+ "alumno/uploadImage/img/"+nombre ;
    }
}