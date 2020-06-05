import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader, stepper, slider } from 'src/app/animations/route-animations';
import { AmbientesComponent } from './gestion-ambientes/ambientes.component';
import { TipoAmbientesComponent } from './tipo-ambientes/tipo-ambientes.component';

@Component({
  selector: 'app-pagina-ambiente',
  templateUrl: './pagina-ambiente.component.html',
  animations: [
    //fader,
    slider,
    //transformer,
    stepper
  ]
})
export class PaginaAmbienteComponent implements OnInit {

  aparece: boolean = true;

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
