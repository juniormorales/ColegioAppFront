import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {
  
  //Variables del formulario
  lsAlumnos: any[] = [];
  dni: number;
  apellido: string;
  nombre: string;

  constructor(
    public _alumnoService: AlumnoService
  ) { }

  ngOnInit() {
    this.listarAlumnos();
  }

  //Web Services
  public listarAlumnos(){
    this._alumnoService.listarAlumnos().subscribe( (resp:any)=>{
      this.lsAlumnos = resp.aaData;
    })
  }

  //Eventos Boton
  public buscarDatosAlumno(){
    var encontro = false;
    this.lsAlumnos.forEach( alumno => {
      if(alumno.persona.dni == this.dni){
        encontro = true;
        if(alumno.estado == 1){
          Swal.fire('¡ADVERTENCIA!','Este alumno ya presenta matricula en el año actual','warning');
        }else{
          this.apellido = alumno.persona.apellidos;
          this.nombre = alumno.persona.nombres;
        }
      }
    });

    if(!encontro){
      Swal.fire('No hay Registros', 'No existe un alumno registrado con el DNI ingresado','info');
    }
  }

}
