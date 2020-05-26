import { Component, OnInit, Input, Output,EventEmitter } from "@angular/core";

import { Nivel } from '../../../models/Nivel';
import { Grado } from '../../../models/Grado';
import { Seccion } from '../../../models/Seccion';
import { NivelService } from '../../services/nivel.service';
import { GradoService } from '../../services/grado.service';
import { SeccionService } from '../../services/seccion.service';

@Component({
    selector:'app-filtrar-nivel-grado-seccion',
    templateUrl:'./filtrar-nivel-grado-seccion.component.html',
    styles: []  
})
export class FiltrarNivelGradoSeccion implements OnInit{

    @Input() nivel: Nivel = new Nivel();
    @Input() grado: Grado = new Grado();
    @Input() seccion: Seccion  = new Seccion();
    @Output() enviarEvento = new EventEmitter();

    public lsNivel: any[] = [];
    public lsGrado: any[] = [];
    public lsSeccion: any[] = [];

    constructor(
        public _nivelService: NivelService,
        public _gradoService: GradoService,
        public _seccionService: SeccionService
    ){ }

    ngOnInit(){
        this.listarNiveles();
    }

    public listarNiveles(){
        this._nivelService.listarNiveles().subscribe((resp:any) => {
            this.lsNivel = resp.aaData;
        });
    }
    
    public listarGrados() {
        this._gradoService.listarGradosPorNivel(this.nivel).subscribe((resp:any) => {
            this.lsGrado = resp.aaData;
        });
    }
    
    public listarSecciones() {
        this._seccionService.listarSeccionPorNivel(this.nivel).subscribe((resp:any) => {
            this.lsSeccion = resp.aaData;
        });
    }

    changeNivel(event) {
        this.seccion.idSeccion = null;
        this.grado.idGrado = null;
        if(event!=null){
            this.nivel.idNivel = event;
            this.listarGrados();
            this.listarSecciones();
        }
    }

    emitirFiltro(){
        this.enviarEvento.emit("emitido");
    }
      
}