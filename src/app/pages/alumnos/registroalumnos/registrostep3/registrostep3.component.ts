import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ZonasService } from 'src/app/pages/services/zonas.service';

@Component({
  selector: 'app-registrostep3',
  templateUrl: './registrostep3.component.html',
  styleUrls: ['./registrostep3.component.scss']
})
export class Registrostep3Component implements OnInit {

  @Input() alumnoForm: FormGroup;
  @Input() wizard;

  //Variables del Dropdown
  lsTipZona: any=[];
  lsDepartamentos: any=[];
  lsProvincias: any=[];
  lsDistritos: any=[];

  selecProv: any;
  selecDist: any;

  settingsGeneral= {
    singleSelection: true,
    text: 'Seleccionar ...',
    enableSearchFilter: false,
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 250,
    autoPosition: false,
    position: 'bottom'
  }

    //Data para el angular2-dropdown
    dataTipZona: any [] = [];
    dataDep: any [] = [];
    dataProv: any [] = [];
    dataDist: any [] = [];

  //Variables de formulario validacion
  focus;
  focus1;
  focus2;
  focus3;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;

  constructor(
    public formBuilder: FormBuilder,
    public _zonaService: ZonasService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.iniciarDatos();
  }

  //Iniciar Datos
  iniciarDatos(){
    this.listarDepartamentos();
    this.listarTiposZona();
  }

  //Web service lista Departamentos
  listarDepartamentos(){
    this._zonaService.listarDepartamentos().subscribe( (resp:any)=>{
      this.lsDepartamentos = resp.aaData;
      this.lsDepartamentos.forEach(element => {
        this.dataDep.push({"id":element.idDepartamento, "itemName":element.descripcion});
      });
    });
  }

  //Web service listar Provincias
  listarProvincias(dep){
    this._zonaService.listarProvincias(dep).subscribe( (resp:any)=> {
      this.lsProvincias = resp.aaData;
      this.lsProvincias.forEach(element => {
        this.dataProv.push({"id":element.idProvincia, "itemName":element.descripcion});
      });
    });
  }

  //Web Service listar Distritos
  listarDistritos(prov){
    this._zonaService.listarDistritos(prov).subscribe( (resp:any)=>{
      this.lsDistritos = resp.aaData;
      this.lsDistritos.forEach(element => {
        this.dataDist.push({"id":element.idDistrito, "itemName":element.descripcion});
      });
    });
  }

  //Web Service Listar Tipos de Zona
  listarTiposZona(){
    this._zonaService.listarTipoZona().subscribe( (resp:any)=>{
      this.lsTipZona = resp.aaData;
      this.lsTipZona.forEach(element => {
        this.dataTipZona.push({"id":element.idTipoZona, "itemName":element.descripcion});
      });
    });
  }

  get registerF() {
    return this.alumnoForm.controls;
  }

  //Eventos del Dropdown
  onProvinciaSelect(event){
    this.dataDist = [];
    this.selecDist = null;
    this.changeDetectorRef.detectChanges();
    this.listarDistritos({"idProvincia":event.id});
  }

  onDepartamentoSelect(event){
    this.dataProv = [];
    this.selecProv = null;
    this.changeDetectorRef.detectChanges();
    this.listarProvincias({"idDepartamento":event.id});
  }

}
