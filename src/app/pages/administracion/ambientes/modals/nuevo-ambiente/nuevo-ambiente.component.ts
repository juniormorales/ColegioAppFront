import { Component, OnInit, Input } from '@angular/core';
import { Ambiente } from 'src/app/models/Ambiente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nuevo-ambiente',
  templateUrl: './nuevo-ambiente.component.html',
  styleUrls: ['./nuevo-ambiente.component.scss']
})
export class NuevoAmbienteComponent implements OnInit {

  //Variables iniciales
  input_ambiente
  ambiente : Ambiente = new Ambiente();

  //Variables del formulario
  ambienteForm: FormGroup;

  focus;
  focus1;
  focusTouched;
  focus1Touched;

  constructor(
    public builder: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.armarForm();
    this.ambiente = this.input_ambiente;
    console.log(this.ambiente)
  }

  //Formulario
  armarForm(){
    this.ambienteForm = this.builder.group({
      numero: [null,[Validators.required]],
      capacidad: [null,[Validators.required]],
      estado: [false]
    });
  }

  get registerF(){
    return this.ambienteForm.controls;
  }

  registrarAmbiente(){

  }

  //funciones del modal
  public cerrarModal(){
    this.bsModalRef.hide();
  }

}
