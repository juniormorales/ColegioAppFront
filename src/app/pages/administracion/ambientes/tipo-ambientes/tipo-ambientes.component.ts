import { Component, OnInit } from '@angular/core';
import { NuevoTipoAmbienteComponent } from '../modals/nuevo-tipo-ambiente/nuevo-tipo-ambiente.component';
import { TipoAmbienteService } from '../../services/tipo-ambiente.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal.service';
import { ModalOptions } from 'ngx-bootstrap/modal/public_api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-ambientes',
  templateUrl: './tipo-ambientes.component.html',
  styleUrls: ['./tipo-ambientes.component.scss']
})
export class TipoAmbientesComponent implements OnInit {

  //Variables de la tabla
  lsTiposAmbiente: any [] = [];

  constructor(
    public _tipoAmbienteService: TipoAmbienteService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.listarTiposAmbientes();
  }

  //WebServices
  public listarTiposAmbientes(){
    this._tipoAmbienteService.listar().subscribe( (resp:any)=>{
      this.lsTiposAmbiente = resp.aaData;
    })
  }

  //Eventos
  public nuevoTipoAmbiente(){
    var nuevo = null;
    this.openModal(nuevo);
  }

  public actualizarTipoAmb(tipoambiente){
    var obj = Object.assign({},tipoambiente);
    obj.accion ='A';
    this.openModal(obj);
  }

  public eliminarTipoAmb(tipoambiente){
    var obj = Object.assign({},tipoambiente);
    obj.accion ='D';
    this.openModal(obj);
  }

  //Modals
  private openModal(obj){
    if(obj == null || obj.accion =='A'){
      this.modalService.modalNuevoTipoAmbiente(obj).subscribe((next)=>{},(err)=>{},
      ()=>{ this.listarTiposAmbientes(); });

    }else{
      Swal.fire({
        title: 'Confirmar Eliminacion',
        text: "¿Desea eliminar  este tipo de ambiente de la base de datos?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.value) {
          this._tipoAmbienteService.eliminar(obj.idTipoAmbiente).subscribe((resp:any)=>{
              if(resp.estado==1){
                Swal.fire('¡HECHO!',resp.mensaje,'success');
              }else {
                Swal.fire('¡ERROR!',resp.mensaje,'error');
              }
              this.listarTiposAmbientes();
          });}
      });
    }
  }
}
