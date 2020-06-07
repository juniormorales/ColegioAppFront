import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slider, stepper } from 'src/app/animations/route-animations';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  animations: [
    //fader,
    slider,
    //transformer,
    stepper
  ]
})
export class ClasesComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['/administracion/clases/gestionclase']);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
