import { Component, OnInit } from '@angular/core';
import { AmbientesService } from '../../services/Ambientes.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoAmbienteComponent } from '../modals/nuevo-ambiente/nuevo-ambiente.component';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { ModalAmbienteService } from '../../services/modal-ambiente.service';

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
    public modalService: ModalAmbienteService,
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

  //Modals
  public openModal(obj){
    this.modalService.modalNuevoAmbiente(obj).subscribe((answer)=>{

    })
  }



}
