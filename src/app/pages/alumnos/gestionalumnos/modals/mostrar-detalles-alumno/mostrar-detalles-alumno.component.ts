import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-mostrar-detalles-alumno',
  templateUrl: './mostrar-detalles-alumno.component.html',
  styleUrls: ['./mostrar-detalles-alumno.component.scss']
})
export class MostrarDetallesAlumnoComponent implements OnInit {

  //Variables iniciales
  @Input() input_alumno: any;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() { 

  }


  //Funciones de botones
  cerrarModal(){
    this.activeModal.close();
  }

}
