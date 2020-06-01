import { Component, OnInit } from '@angular/core';
import { NuevoTipoAmbienteComponent } from '../modals/nuevo-tipo-ambiente/nuevo-tipo-ambiente.component';
import { TipoAmbienteService } from '../../services/tipo-ambiente.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalAmbienteService } from '../../services/modal-ambiente.service';

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
    public modalService: ModalAmbienteService
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

  //Modals
  private openModal(obj){
    if(obj == null || obj.accion =='A'){
      this.modalService.modalNuevoTipoAmbiente(obj).subscribe((answer)=>{

      })
    }
  }
}
