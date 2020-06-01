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
    styleUrls: ['./filtrar-nivel-grado-seccion.component.scss']
})
export class FiltrarNivelGradoSeccion implements OnInit{

    @Input() nivel: Nivel = new Nivel();
    @Input() grado: Grado = new Grado();
    @Input() seccion: Seccion  = new Seccion();
    @Output() enviarEvento = new EventEmitter();

    //Variables del dropdown
    dataNivel: any[] = [];
    dataGrado: any[] = [];
    dataSeccion: any[] = [];

    selecNivel: any;
    selecGrado: any;
    selecSeccion: any;

    settingsNivel= {
        singleSelection: true,
        text: 'Seleccionar ...',
        enableSearchFilter: false,
        classes: 'selectpicker btn-info',
        lazyLoading: true,
        maxHeight: 100,
        autoPosition: false,
        position: 'bottom'
    }

    settingsGeneral= {
        singleSelection: true,
        text: 'Seleccionar ...',
        enableSearchFilter: false,
        classes: 'selectpicker btn-info',
        lazyLoading: true,
        maxHeight: 250,
        autoPosition: false,
        position: 'bottom'
    }

    constructor(
        public _nivelService: NivelService,
        public _gradoService: GradoService,
        public _seccionService: SeccionService
    ){ }

    ngOnInit(){
        this.listarNiveles();
    }

    //Eventos del dropdown
    public onNivelSelect(event){
        this.nivel.idNivel = event.id;
        this.listarGrados();
        this.listarSecciones();
    }

    public onGradoSelect(event){
        this.grado.idGrado = event.id;
    }

    public onSeccionSelect(event){
        this.seccion.idSeccion = event.id;
    }

    public emitirFiltro(){
        this.enviarEvento.emit("emitido");
    }

    //Web Services
    public listarNiveles(){
        this._nivelService.listarNiveles().subscribe((resp:any) => {
            resp.aaData.forEach(element => {
                this.dataNivel.push({"id":element.idNivel, "itemName":element.descripcion});
              });
        });
    }
    
    public listarGrados() {
        this._gradoService.listarGradosPorNivel(this.nivel).subscribe((resp:any) => {
            resp.aaData.forEach(element => {
                this.dataGrado.push({"id":element.idGrado, "itemName":element.descripcion});
              });
        });
    }
    
    public listarSecciones() {
        this._seccionService.listarSeccionPorNivel(this.nivel).subscribe((resp:any) => {
            resp.aaData.forEach(element => {
                this.dataSeccion.push({"id":element.idSeccion, "itemName":element.descripcion});
            });
        });
    }
      
}