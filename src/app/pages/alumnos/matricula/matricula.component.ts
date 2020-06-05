import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  matricular: boolean = false;
  matriculaForm: FormGroup;

    //Validacion
    focus;
    focus1;
    focus2;
    focus3;
    focusTouched;
    focus1Touched;
    focus2Touched;
    focus3Touched;

  constructor(
    public _alumnoService: AlumnoService,
    public builder: FormBuilder
  ) { }

  ngOnInit() {
    this.listarAlumnos();
  }

  //Formulario
  private crearFormulario(){
    this.matriculaForm = this.builder.group({

    });
  }

  public onRegister(){

  }

  get registerF(){
    return this.matriculaForm.controls;
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
          this.matricular = true;
        }
      }
    });

    if(!encontro){
      Swal.fire('No hay Registros', 'No existe un alumno registrado con el DNI ingresado','info');
    }
  }

}
