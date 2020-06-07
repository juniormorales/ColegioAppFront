import { Component, OnInit } from '@angular/core';
import { AmbientesService } from '../../services/Ambientes.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoAmbienteComponent } from '../modals/nuevo-ambiente/nuevo-ambiente.component';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.scss']
})
export class AmbientesComponent implements OnInit {

  //Variables de la tabla
  lsAmbientes: any [] = [];

  //Variables Modal

  constructor(
    public _ambienteService: AmbientesService,
    public modalService: ModalService,
  ) { }

  ngOnInit() {
    this.listarAmbientes();
  }

  //WebServices
  public listarAmbientes(){
    this._ambienteService.listar().subscribe( (resp:any)=>{
      this.lsAmbientes = resp.aaData;
    })
  }

  //Eventos
  public nuevoAmbiente(){
    var nuevo = null
    this.openModal(nuevo);
  }

  public actualizarAmbiente(ambiente){
    var obj = Object.assign({},ambiente);
    obj.accion ="A";
    this.openModal(obj);
  }

  public eliminarAmbiente(ambiente){
    var obj = Object.assign({},ambiente);
    obj.accion ="D";
    this.openModal(obj);
  }

  //Modals
  public openModal(obj){
    if(obj == null || obj.accion == "A"){
      this.modalService.modalNuevoAmbiente(obj).subscribe((next)=>{},(err)=>{},
      ()=>{
        this.listarAmbientes();
      })
    }else{
      Swal.fire({
        title: 'Confirmar Eliminacion',
        text: "¿Desea eliminar  este ambiente de la base de datos?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.value) {
          this._ambienteService.eliminar(obj.idAmbiente).subscribe((resp:any)=>{
              if(resp.estado==1){
                Swal.fire('¡HECHO!',resp.mensaje,'success');
              }else {
                Swal.fire('¡ERROR!',resp.mensaje,'error');
              }
              this.listarAmbientes();
          });}
      });
    }
    
  }



}
