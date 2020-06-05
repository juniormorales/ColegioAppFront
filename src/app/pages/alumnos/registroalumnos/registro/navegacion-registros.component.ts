import { Component, OnInit } from "@angular/core";
import Stepper from "bs-stepper";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Alumno } from '../../../../models/Alumno';
import { AlumnoService } from '../../services/alumno.service';
import { slideIn } from 'src/app/animations/table-animations';

@Component({
  selector: "app-navegacion-registros",
  templateUrl: "navegacion-registros.component.html",
  animations: [
    //fadeIn,
    slideIn
  ]
})
export class NavegacionRegistrosComponent implements OnInit {
  //Variables del componenten navegacion
  value = 15;
  private stepper: Stepper;
  checked = false;
  checked1 = false;
  checked2 = false;
  wizard = false;
  step = 1;

  //Variables del formulario
  ano_actual;
  public alumnoForm: FormGroup;
  alumno : Alumno;

    //Varialbes de la foto
    public archivo: File = null;
 
  constructor(
    public formBuilder: FormBuilder,
    public route: Router,
    public _alumnoService: AlumnoService
    ) {}

  ngOnInit() {
    this.ano_actual = (new Date()).getFullYear();
    this.alumno = new Alumno();
    var wizard = document.getElementsByClassName("card-wizard")[0];
    wizard.classList.add("active");
    var stepper = document.getElementById("wizardProfile");

    this.stepper = new Stepper(stepper, {
      linear: false,
      animation: true
    });
    this.construirFormulario();
  }

  //Metodos del formulario
  construirFormulario(){
    this.alumnoForm = this.formBuilder.group({
      dni: ["",[Validators.required,Validators.max(99999999)]],
      nombres: ["", [Validators.required, Validators.minLength(1)]],
      apellidos: ["", [Validators.required, Validators.minLength(1)]],
      fecha_nac: ["",[Validators.required]],
      sexo: [[], [Validators.required]],
      familia: ["ambos", [Validators.required]],
      otro: [""],
      telefono: [""],
      colegio_proc:[""],
      dir_domicilio:["",[Validators.required, Validators.minLength(5)]],
      tip_zona:[[]],
      departamento:[[],[Validators.required]],
      provincia: [[],[Validators.required]],
      distrito: [[],[Validators.required]]
    });

    this.alumnoForm.get('otro').disable();
    this.alumnoForm.get('familia').valueChanges.subscribe(val => {
      if(val == 'otros'){
        this.alumnoForm.get('otro').enable()
      }else{
        this.alumnoForm.get('otro').reset();
        this.alumnoForm.get('otro').disable();
      }
    });
  }

  get registerF() {
    return this.alumnoForm.controls;
  }

  construirObjetoAlumno(){
    this.alumno.promedioGeneral = 0;
    this.alumno.estado = 0;
    this.alumno.nroRepitencias = 0;
    this.alumno.anosEstudio = 0;
    if(this.alumnoForm.get('familia').value != 'otros'){
      this.alumno.familia = this.alumnoForm.get('familia').value;

    }else{
      this.alumno.familia = this.alumnoForm.get('otro').value;
    }
    this.alumno.colegioProcedencia = this.alumnoForm.get('colegio_proc').value;
    this.alumno.persona.apellidos = this.alumnoForm.get('apellidos').value;
    this.alumno.persona.nombres = this.alumnoForm.get('nombres').value;
    this.alumno.persona.direccion = this.alumnoForm.get('dir_domicilio').value;
    this.alumno.persona.dni = this.alumnoForm.get('dni').value;
    this.alumno.persona.fechaNacimiento = this.alumnoForm.get('fecha_nac').value;
    this.alumno.persona.sexo = this.alumnoForm.get('sexo').value[0].itemName;
    this.alumno.persona.telefono = this.alumnoForm.get('telefono').value;
    this.alumno.persona.departamento = {
      "idDepartamento": this.alumnoForm.get('departamento').value[0].id,
    };
    this.alumno.persona.tipoZona = {
      "idTipoZona": this.alumnoForm.get('tip_zona').value[0].id
    };
    this.alumno.persona.provincia = {
      "idProvincia": this.alumnoForm.get('provincia').value[0].id
    };
    this.alumno.persona.distrito = {
      "idDistrito": this.alumnoForm.get('distrito').value[0].id
    }
  }


  onRegister() {
    this.wizard = true;
    if (this.alumnoForm.invalid) {
      Swal.fire('¡ADVERTENCIA!','Complete los campos obligatorios para continuar','warning');
      return;
    }else{
      this.construirObjetoAlumno();
      Swal.fire({
        title: 'Confirmar Registro',
        text: "¿Registrar a " + this.getNombres() + ' en la base de datos?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, registrar!'
      }).then((result) => {
        if (result.value) {
          this.registrarAlumno();
        }
      })
    }
  }

  //Metodos del Step
  next() {
      if (this.value < 51) {
        this.step++;
        this.value += 35;
      }
      if (this.step === 1) {
        this.checked = true;
      } else if (this.step === 2) {
        this.checked1 = true;
      } else {
        this.checked2 = true;
      }
      this.stepper.next();
    
  }
  previous() {
    this.stepper.previous();
    if (this.value > 15) {
      this.value -= 35;
      this.step--;
    }
  }

  //Metodos auxiliares
  getNombres(){
    return this.alumnoForm.get('nombres').value + ' ' + this.alumnoForm.get('apellidos').value;
  }

  registrarAlumno(){
    this._alumnoService.registrarAlumno(this.alumno).subscribe((resp:any)=>{
      this._alumnoService.subirImagenAlumno(this.archivo,resp.defaultObj.persona.idPersona).subscribe((resp:any)=>{
        Swal.fire("¡Hecho!","El Alumno ha sido registrado correctamente",'success');
        this.route.navigate(['/alumnos/gestionalumnos']);      
      });
    });
  }

  capturarImagen(event){
    this.archivo = event;
  }

}
