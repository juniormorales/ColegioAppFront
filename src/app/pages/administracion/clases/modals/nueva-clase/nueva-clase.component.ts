import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clase } from 'src/app/models/Clase';
import { AmbientesService } from '../../../services/Ambientes.service';
import { NivelService } from 'src/app/pages/services/nivel.service';
import { GradoService } from 'src/app/pages/services/grado.service';
import { SeccionService } from 'src/app/pages/services/seccion.service';
import { Nivel } from 'src/app/models/Nivel';
import { TurnoService } from '../../../services/turno.service';
import Swal from 'sweetalert2';
import { ClaseService } from '../../../services/clase.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.scss']
})
export class NuevaClaseComponent implements OnInit {

  //Variables del formulario
  claseForm: FormGroup;
  clase: Clase;
  input_clase: any;

  //Variables de validacion
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;
  focus4Touched;

  //Variables del dropdown
  dataAmbiente: any = [];
  dataNivel: any = [];
  dataGrado: any = [];
  dataSeccion: any = [];
  dataTurno: any = [];
  settingsGeneral = {
    singleSelection: true,
    text: 'Seleccionar ...',
    enableSearchFilter: false,
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 150,
    autoPosition: false,
    position: 'bottom'
  }

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private builder: FormBuilder,
    private ambienteService: AmbientesService,
    private nivelService: NivelService,
    private gradoService: GradoService,
    private seccionService: SeccionService,
    private turnoService: TurnoService,
    private claseService: ClaseService,
  ) { }

  ngOnInit() {
    this.crearFormulario();

    if (this.input_clase != null) {
      this.clase = this.input_clase;
      this.setearFormActualizar();
      this.listarGrado(this.clase.nivel);
      this.listarSeccion(this.clase.nivel);
    } else {
      this.clase = new Clase();
    }
    this.listarAmbientes();
    this.listarNivel();
    this.listarTurnos();
  }

  //Metodos formulario
  private crearFormulario() {
    this.claseForm = this.builder.group({
      ambiente: [[], [Validators.required]],
      nivel: [[], [Validators.required]],
      grado: [[], [Validators.required]],
      seccion: [[], [Validators.required]],
      turno: [[], [Validators.required]]
    });
  }

  private setearFormActualizar() {
    this.claseForm.setValue({
      ambiente: [{
        id: this.clase.ambiente.idAmbiente,
        itemName: this.clase.ambiente.numero + " - " + this.clase.ambiente.tipoAmbiente.descripcion
      }],
      nivel: [{
        id: this.clase.nivel.idNivel,
        itemName: this.clase.nivel.descripcion
      }],
      grado: [{
        id: this.clase.grado.idGrado,
        itemName: this.clase.grado.descripcion
      }],
      seccion: [{
        id: this.clase.seccion.idSeccion,
        itemName: this.clase.seccion.descripcion
      }],
      turno: [{
        id: this.clase.turno.idTurno,
        itemName: this.clase.turno.descripcion + " - " + "De " + this.clase.turno.horaInicio + " a " + this.clase.turno.horaFin
      }],
    });
  }

  get registerF() {
    return this.claseForm.controls;
  }

  //Web Services

  public registrarClase() {
    this.claseService.registrar(this.clase).subscribe((resp: any) => {
      Swal.fire('¡HECHO!', resp.mensaje, 'success');
      this.bsModalRef.hide();
    });
  }

  public actualizarClase() {
    this.claseService.actualizar(this.clase).subscribe((resp: any) => {
      Swal.fire('¡HECHO!', resp.mensaje, 'success');
      this.bsModalRef.hide();
    });
  }

  public listarAmbientes() {
    this.ambienteService.listarDisponibles().subscribe((resp: any) => {
      resp.aaData.forEach(element => {
        this.dataAmbiente.push({ "id": element.idAmbiente, "itemName": element.numero + " - " + element.tipoAmbiente.descripcion });
      });
    });
  }

  public listarNivel() {
    this.nivelService.listarNiveles().subscribe((resp: any) => {
      resp.aaData.forEach(element => {
        this.dataNivel.push({ "id": element.idNivel, "itemName": element.descripcion });
      });
    });
  }

  public listarGrado(nivel) {
    this.dataGrado = [];
    this.gradoService.listarGradosPorNivel(nivel).subscribe((resp: any) => {
      resp.aaData.forEach(element => {
        this.dataGrado.push({ "id": element.idGrado, "itemName": element.descripcion });
      });
    });
  }

  public listarSeccion(nivel) {
    this.dataSeccion = [];
    this.seccionService.listarSeccionPorNivel(nivel).subscribe((resp: any) => {
      resp.aaData.forEach(element => {
        this.dataSeccion.push({ "id": element.idSeccion, "itemName": element.descripcion });
      });
    });
  }

  public listarTurnos() {
    this.turnoService.listar().subscribe((resp: any) => {
      resp.aaData.forEach(element => {
        this.dataTurno.push({ "id": element.idTurno, "itemName": element.descripcion + " - " + "De " + element.horaInicio + " a " + element.horaFin });
      });
    });
  }

  private alertaConfirmar(mensaje) {
    Swal.fire({
      title: 'Confirmar Registro',
      text: "¿" + mensaje + " esta clase en la base de datos?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!'
    }).then((result) => {
      if (result.value) {
        if (this.clase.accion == 'A') {
          this.actualizarClase();
        } else {
          this.registrarClase();
        }
      }
    });
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  //Eventos de boton
  public crud() {
    if (this.claseForm.valid) {
      this.armarObjeto();
      console.log(this.clase)
      if (this.clase.accion != null) {
        this.alertaConfirmar('Actualizar');
      } else {
        this.alertaConfirmar('Registrar');
      }
    } else {
      Swal.fire('¡ADVERTENCIA!', 'Complete los campos obligatorios para continuar', 'warning');
    }
  }

  public onNivelSelect(event) {
    this.claseForm.patchValue({ grado: [], seccion: [] });
    var nivel = new Nivel();
    nivel.idNivel = event.id;
    this.listarGrado(nivel);
    this.listarSeccion(nivel);
  }

  //funciones auxiliares
  private armarObjeto() {
    this.clase.ambiente.idAmbiente = this.claseForm.get('ambiente').value[0].id;
    this.clase.nivel.idNivel = this.claseForm.get('nivel').value[0].id;
    this.clase.grado.idGrado = this.claseForm.get('grado').value[0].id;
    this.clase.seccion.idSeccion = this.claseForm.get('seccion').value[0].id;
    this.clase.turno.idTurno = this.claseForm.get('turno').value[0].id;
  }

}
