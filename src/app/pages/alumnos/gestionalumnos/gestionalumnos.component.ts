import { Component, OnInit } from '@angular/core';
import { slideIn } from '../../../animations/table-animations';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from '../services/alumno.service';
import { Nivel } from '../../../models/Nivel';
import { Seccion } from '../../../models/Seccion';
import { Grado } from '../../../models/Grado';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gestionalumnos',
  templateUrl: './gestionalumnos.component.html',
  styleUrls: ['./gestionalumnos.component.scss'],
  animations: [
    //fadeIn,
    slideIn
   ]
})
export class GestionalumnosComponent implements OnInit {

  //Variables
  public lsAlumnos: any[] = [];
  public nivel: Nivel = new Nivel();
  public grado: Grado = new Grado();
  public seccion: Seccion  = new Seccion();

  //Variables NgxTable
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;

  constructor(
    public _alumnoService: AlumnoService,
    public _toastService: ToastrService,
  ) { }

  ngOnInit() {
   this.listarAlumnos();
  }

  //Metodos Para NgxTable
  llenarTabla(){
    this.temp = this.lsAlumnos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
    console.log(this.temp)
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.lsAlumnos.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }
  

  //WEB SERVICES
  async listarAlumnos(){
    await this._alumnoService.listarAlumnos().subscribe( (resp:any)=>{
        this._toastService.success('Se ha listado correctamente','Listado');
        this.lsAlumnos = resp.aaData;
        this.llenarTabla();
    });
  }

  verDetalleAlumno(alumno){

  }

  editarAlumno(alumno){

  }

  darBajaAlumno(alumno){

  }

  filtrarAlumnos(){
    if(this.nivel.idNivel == null && this.grado.idGrado == null && this.seccion.idSeccion == null){
      this.listarAlumnos();
    }else{
      console.log(this.nivel);
      console.log(this.grado);
      console.log(this.seccion);
    }
    
  }
}
