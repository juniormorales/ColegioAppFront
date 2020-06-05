import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.component.html',
  styleUrls: ['./gestion-clases.component.scss'],
  animations: [
    trigger(
      'tableAnimationClase', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('400ms', style({transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('400ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ])
  ]
})
export class GestionClasesComponent implements OnInit {

  
  //Variables
  public lsAlumnos: any[] = [];

  //Variables NgxTable
  entries: number = 10;
  temp = [];

  //Modals
 

  constructor(


  ) { }

  ngOnInit() {
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsAlumnos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.lsAlumnos.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

}
