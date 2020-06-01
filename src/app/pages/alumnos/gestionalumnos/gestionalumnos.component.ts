import { Component, OnInit, HostListener, ViewChild, ViewContainerRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { slideIn } from '../../../animations/table-animations';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from '../services/alumno.service';
import { Nivel } from '../../../models/Nivel';
import { Seccion } from '../../../models/Seccion';
import { Grado } from '../../../models/Grado';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MostrarDetallesAlumnoComponent } from './modals/mostrar-detalles-alumno/mostrar-detalles-alumno.component';

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
  public seccion: Seccion = new Seccion();

  //Variables NgxTable
  entries: number = 10;
  temp = [];

  //Modals
  modalRef: NgbModalRef;

  constructor(
    public _alumnoService: AlumnoService,
    public _toastService: ToastrService,
    public _modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.listarAlumnos();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsAlumnos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.lsAlumnos.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  //WEB SERVICES
  listarAlumnos() {
      this._alumnoService.listarAlumnos().subscribe((resp: any) => {
        this._toastService.success(
          '<span class=" tim-icons icon-bell-55"></span>Carga de lista completada',
          "",
          {
            timeOut: 2000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-top-right"
          }
        );
      this.lsAlumnos = resp.aaData;
      this.llenarTabla();
    });
  }


  //MODALS
  verDetalleAlumno(alumno) {
    this.modalRef = this._modalService.open(MostrarDetallesAlumnoComponent,
      {
      backdrop: 'static',
        keyboard: false,
        size: 'xl',
        scrollable: true
    });
    this.modalRef.componentInstance.input_alumno = alumno;
  }

  editarAlumno(alumno) {

  }

  darBajaAlumno(alumno) {

  }

  filtrarAlumnos() {
    if (this.nivel.idNivel == null && this.grado.idGrado == null && this.seccion.idSeccion == null) {
      //this.listarAlumnos();
    } else {

    }

  }
}
