import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoAmbienteService } from '../../../services/tipo-ambiente.service';
import Swal from 'sweetalert2';
import { TipoAmbiente } from 'src/app/models/tipoAmbiente';

@Component({
  selector: 'app-nuevo-tipo-ambiente',
  templateUrl: './nuevo-tipo-ambiente.component.html',
  styleUrls: ['./nuevo-tipo-ambiente.component.scss']
})
export class NuevoTipoAmbienteComponent implements OnInit {

  //Variables iniciales
  input_tipo_ambiente
  tipoAmbiente : TipoAmbiente;

  //Variables del formulario
  tipoAmbienteForm: FormGroup;

  focus;
  focusTouched;

  constructor(
    public builder: FormBuilder,
    public bsModalRef: BsModalRef,
    public tipoAmbienteService: TipoAmbienteService,
    public modalService: BsModalService
  ) { }

  ngOnInit() {
    this.armarForm();
    if(this.input_tipo_ambiente != null){
      this.tipoAmbiente  = this.input_tipo_ambiente;
      this.tipoAmbienteForm.setValue({descripcion:this.tipoAmbiente.descripcion})
    }else{
      this.tipoAmbiente = new TipoAmbiente();
    }
  }

  //Formulario
  armarForm(){
    this.tipoAmbienteForm = this.builder.group({
      descripcion: [null,[Validators.required]],
    });
  }

  get registerF(){
    return this.tipoAmbienteForm.controls;
  }

  armarObjeto(){
    this.tipoAmbiente.descripcion = this.tipoAmbienteForm.get('descripcion').value;
  }

  //Web services

  alertaConfirmar(mensaje){
    Swal.fire({
      title: 'Confirmar Registro',
      text: "¿"+ mensaje +" este tipo de ambiente en la base de datos?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!'
    }).then((result) => {
      if (result.value) {
        if(this.tipoAmbiente.accion == 'A'){
          this.actualizarTipoAmbiente();
        }else{
          this.registrarTipoAmbiente();
        }
      }
    });
  }

  registrarTipoAmbiente(){
    this.tipoAmbienteService.registrar(this.tipoAmbiente).subscribe((resp :any)=>{
      Swal.fire("¡HECHO!",resp.mensaje,'success');
      this.bsModalRef.hide();
    });
  }

  actualizarTipoAmbiente(){
    this.tipoAmbienteService.actualizar(this.tipoAmbiente).subscribe((resp:any)=>{
      Swal.fire("¡HECHO!",resp.mensaje,'success');
      this.bsModalRef.hide();
    });
  }

  //funciones del modal
  public cerrarModal(){
    this.modalService.setDismissReason('CERRAR')
    this.bsModalRef.hide();
  }

  crud(){
    if(this.tipoAmbienteForm.valid){
      this.armarObjeto();
      if(this.tipoAmbiente.accion!=null){
        this.alertaConfirmar('Actualizar');
      }else{
        this.alertaConfirmar('Registrar');
      }
    }else{
      Swal.fire('¡ADVERTENCIA!','Complete los campos obligatorios para continuar','warning');
    }
  }

}
