import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Nivel } from 'src/app/models/Nivel';
import { ClaseService } from '../../../services/clase.service';
import { GradoService } from 'src/app/pages/services/grado.service';

@Component({
  selector: 'app-grupo-grado',
  templateUrl: './grupo-grado.component.html',
  styleUrls: ['./grupo-grado.component.scss']
})
export class GrupoGradoComponent implements OnInit, OnDestroy {

  //Variables externas
  @Input() recibirNivel;
  private eventSubscription: Subscription;

  //Variables generales
  lsClases: any[] = [];
  lsGrados: any[] = [];
  nivel: Nivel = new Nivel();

  //Variables de paginacion
  p: number = 1;

  constructor(
    private claseService: ClaseService,
    private gradoService: GradoService,
  ) { }

  ngOnInit() {
    this.eventSubscription = this.recibirNivel.subscribe((data: Nivel) => {
      this.nivel = data;
      this.listarClases();
    });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  //WebServices
  private listarClases() {
    this.claseService.listarClasesPorNivel(this.nivel).subscribe((resp: any) => {
      this.lsClases = resp.aaData;
      this.listarGrados();
    });
  }

  private listarGrados(){
    this.lsGrados = [];
    this.gradoService.listarGradosPorNivel(this.nivel).subscribe((resp:any)=>{
      resp.aaData.forEach( grado => {
        grado = Object.assign({lsSeccion:[],grado});
        this.lsClases.forEach( clase => {
          if(grado.grado.descripcion == clase.grado.descripcion){
            grado.lsSeccion.push(clase.seccion);
          }
        });
        this.lsGrados.push(grado);
      });
    });
  }


}
