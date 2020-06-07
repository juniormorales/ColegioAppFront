import { Component, OnInit, Input } from '@angular/core';
import { Ambiente } from 'src/app/models/Ambiente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoAmbienteService } from '../../../services/tipo-ambiente.service';
import Swal from 'sweetalert2';
import { AmbientesService } from '../../../services/Ambientes.service';

@Component({
  selector: 'app-nuevo-ambiente',
  templateUrl: './nuevo-ambiente.component.html',
  styleUrls: ['./nuevo-ambiente.component.scss']
})
export class NuevoAmbienteComponent implements OnInit {

  //Variables iniciales
  input_ambiente
  ambiente: Ambiente;
  lsTipoAmbiente: any[] = [];

  //Variables del formulario
  ambienteForm: FormGroup;

  focus;
  focus1;
  focus2;
  focusTouched;
  focus1Touched;
  focus2Touched;

  //Data para el angular2-dropdown
  dataTipo: any[] = [];

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
    public builder: FormBuilder,
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    public _tipoAmbienteService: TipoAmbienteService,
    public _ambienteService: AmbientesService,
  ) { }

  ngOnInit() {
    this.armarForm();
    if (this.input_ambiente != null) {
      this.ambiente = this.input_ambiente;
      this.setearFormActualizar();
    } else {
      this.ambiente = new Ambiente();
    }
    this.listarTiposAmbiente();
  }

  //Formulario
  private armarForm() {
    this.ambienteForm = this.builder.group({
      numero: [null, [Validators.required]],
      capacidad: [null, [Validators.required]],
      estado: [false],
      tipo: [[], [Validators.required]]
    });
  }

  private setearFormActualizar() {
    this.ambienteForm.setValue({
      numero: this.ambiente.numero,
      capacidad: this.ambiente.capacidad,
      estado: this.ambiente.estado,
      tipo: [{
        id: this.ambiente.tipoAmbiente.idTipoAmbiente,
        itemName: this.ambiente.tipoAmbiente.descripcion
      }]
    });
  }

  get registerF() {
    return this.ambienteForm.controls;
  }

  private armarObjeto() {
    this.ambiente.numero = this.ambienteForm.get('numero').value;
    this.ambiente.estado = this.ambienteForm.get('estado').value;
    this.ambiente.capacidad = this.ambienteForm.get('capacidad').value;
    this.ambiente.tipoAmbiente.idTipoAmbiente = this.ambienteForm.get('tipo').value[0].id;
  }

  //Web Services
  listarTiposAmbiente() {
    this._tipoAmbienteService.listar().subscribe((resp: any) => {
      this.lsTipoAmbiente = resp.aaData;
      this.lsTipoAmbiente.forEach(element => {
        this.dataTipo.push({ "id": element.idTipoAmbiente, "itemName": element.descripcion });
      });
    });
  }

  alertaConfirmar(mensaje) {
    Swal.fire({
      title: 'Confirmar Registro',
      text: "¿" + mensaje + " este ambiente en la base de datos?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!'
    }).then((result) => {
      if (result.value) {
        if (this.ambiente.accion == 'A') {
          this.actualizarAmbiente();
        } else {
          this.registrarAmbiente();
        }
      }
    });
  }

  public registrarAmbiente() {
    this._ambienteService.registrar(this.ambiente).subscribe((resp: any) => {
      Swal.fire("¡HECHO!", resp.mensaje, 'success');
      this.bsModalRef.hide();
    });
  }

  public actualizarAmbiente() {
    this._ambienteService.actualizar(this.ambiente).subscribe((resp: any) => {
      Swal.fire("¡HECHO!", resp.mensaje, 'success');
      this.bsModalRef.hide();
    });
  }

  //funciones del modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  //Eventos del boton
  crud() {
    if (this.ambienteForm.valid) {
      this.armarObjeto();
      if (this.ambiente.accion != null) {
        this.alertaConfirmar('Actualizar');
      } else {
        this.alertaConfirmar('Registrar');
      }
    } else {
      Swal.fire('¡ADVERTENCIA!', 'Complete los campos obligatorios para continuar', 'warning');
    }
  }

}
