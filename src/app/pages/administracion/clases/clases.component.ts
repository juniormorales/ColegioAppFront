import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  
})
export class ClasesComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['/administracion/clases/gestionclase']);
  }

}
