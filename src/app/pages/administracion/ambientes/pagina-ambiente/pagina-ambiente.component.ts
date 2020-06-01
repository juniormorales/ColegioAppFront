import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader, stepper, slider } from 'src/app/animations/route-animations';

@Component({
  selector: 'app-pagina-ambiente',
  templateUrl: './pagina-ambiente.component.html',
  styleUrls: ['./pagina-ambiente.component.scss'],
  animations: [
    //fader,
    slider,
    //transformer,
    stepper
  ]
})
export class PaginaAmbienteComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['/administracion/ambientes/gestionambiente']);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
