import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { NuevoAmbienteComponent } from '../ambientes/modals/nuevo-ambiente/nuevo-ambiente.component';
import { NuevoTipoAmbienteComponent } from '../ambientes/modals/nuevo-tipo-ambiente/nuevo-tipo-ambiente.component';

@Injectable({
  providedIn: 'root'
})
export class ModalAmbienteService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalNuevoAmbiente(obj): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_ambiente: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(NuevoAmbienteComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }

  modalNuevoTipoAmbiente(obj): Observable<any> {

    const config: ModalOptions = {
      initialState:  {
        input_tipo_ambiente: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
      class: 'modal-sm'
    }
    this.modalRef = this.bsModalService.show(NuevoTipoAmbienteComponent,  config );
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }
}
