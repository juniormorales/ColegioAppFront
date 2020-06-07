import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.component.html',
  styleUrls: ['./gestion-clases.component.scss'],
})
export class GestionClasesComponent implements OnInit {


  //Variables
  public lsClases: any[] = [];

  //Variables NgxTable
  entries: number = 10;
  temp = [];
  searchSalon: String = '';
  searchTurno: String = '';
  searchNivel: String = '';

  //Modals


  constructor(
    public claseService: ClaseService,
    public modalService : ModalService,
  ) { }

  ngOnInit() {

    this.listarClases();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsClases.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTableByTurno(event) {
    let val = event.target.value;
    var array1: any = [];
    var array2: any = [];
    this.temp = this.lsClases.filter(clase => {
      return clase.turno.descripcion.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    })
    if (this.searchNivel != '') {
      array1 = this.lsClases.filter(clase => {
        return clase.nivel.descripcion.toLocaleLowerCase().indexOf(this.searchNivel.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array1);
    }

    if (this.searchSalon != '') {
      array2 = this.temp.filter(clase => {
        return clase.ambiente.numero.toString().toLocaleLowerCase().indexOf(this.searchSalon.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array2);
    }
  }

  filterTableBySalon(event) {
    let val = event.target.value;
    var array1: any = [];
    var array2: any = [];
    this.temp = this.lsClases.filter(clase => {
      return clase.ambiente.numero.toString().toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    });

    if (this.searchNivel != '') {
      array1 = this.lsClases.filter(clase => {
        return clase.nivel.descripcion.toLocaleLowerCase().indexOf(this.searchNivel.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array1);
    }

    if (this.searchTurno != '') {
      array2 = this.temp.filter(clase => {
        return clase.turno.descripcion.toLocaleLowerCase().indexOf(this.searchTurno.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array2);
    }

  }

  filterTableByNivel(event) {
    let val = event.target.value;
    var array1: any = [];
    var array2: any = [];
    this.temp = this.lsClases.filter(clase => {
      return clase.nivel.descripcion.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    })

    if (this.searchSalon != '') {
      array1 = this.temp.filter(clase => {
        return clase.ambiente.numero.toString().toLocaleLowerCase().indexOf(this.searchSalon.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array1);
    }

    if (this.searchTurno != '') {
      array2 = this.temp.filter(clase => {
        return clase.turno.descripcion.toLocaleLowerCase().indexOf(this.searchTurno.toLocaleLowerCase()) > -1
      });
      this.temp = this.fusionarArray(this.temp, array2);
    }
  }

  //WebServices
  public listarClases() {
    this.claseService.listarClases().subscribe((resp: any) => {
      this.lsClases = resp.aaData;
      this.llenarTabla();
    });
  }

  //Modal
  private openModal(obj){
    this.modalService.modalNuevaClase(obj).subscribe(resp=>{},err=>{},()=>{
      this.listarClases();
    });
  }

  //Eventos del boton
  public nuevaClase(){
    var obj = null;
    this.openModal(obj);
  }

  public editarclase(clase){
    var obj = Object.assign({},clase);
    obj.accion = "A";
    this.openModal(clase);
  }

  //funciones auxiliares
  private fusionarArray(array1: any[], array2: any[]): any[] {
    var array_final = [];
    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          array_final.push(array1[i]);
        }
      }
    }
    return array_final;
  }

}
