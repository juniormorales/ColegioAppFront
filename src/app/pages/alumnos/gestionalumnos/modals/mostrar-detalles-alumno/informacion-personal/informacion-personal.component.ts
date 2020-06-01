import { Component, OnInit, Input } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/pages/alumnos/services/alumno.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss']
})
export class InformacionPersonalComponent implements OnInit {

//Variables iniciales
@Input() input_alumno: any;
imgURL: any
alumno: Alumno = new Alumno();
edad: number;
ano_actual: number;

constructor(
  public _alumnoService: AlumnoService,
) {}

ngOnInit() { 

  this.ano_actual = (new Date()).getFullYear();
  this.alumno = this.input_alumno;
  this.edad = this.calcularEdad(this.alumno.persona.fechaNacimiento);
  if(this.alumno.persona.urlFoto == null){
    this.imgURL = "../../../../../../../assets/img/default-avatar.png";
  }else{
    this.verFoto();
  }
  
}

  
  //WebServices
  verFoto(){
    this.imgURL = this._alumnoService.verFoto(this.alumno.persona.urlFoto);
  }


    //Funciones extras
    calcularEdad(FechaNacimiento) {

      var fechaNace = new Date(FechaNacimiento);
      var fechaActual = new Date()
      var restar = 0;
  
      if(fechaActual.getMonth == fechaNace.getMonth){
        if(fechaActual.getDate() < fechaNace.getDate()){
          restar = 1;
        }
      }else if(fechaActual.getMonth() < fechaNace.getMonth()){
        restar =1;
      }
  
      return  (fechaActual.getFullYear()- fechaNace.getFullYear()) - restar;
  
  }

}
