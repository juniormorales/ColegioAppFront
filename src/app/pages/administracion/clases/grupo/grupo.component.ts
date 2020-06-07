import { Component, OnInit, Input } from '@angular/core';
import { Nivel } from 'src/app/models/Nivel';
import { NivelService } from 'src/app/pages/services/nivel.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  //Variable de evento al componente hijo
  enviarNivel: Subject<Nivel> = new Subject<Nivel>();

  //Variables generales
  lsNivel: any = [];
  nivel : Nivel = new Nivel();

  constructor(
    private nivelService : NivelService,
  ) { }

  ngOnInit() {
    this.listarNiveles();
  }

  //WebServices
  private listarNiveles(){
    this.nivelService.listarNiveles().subscribe((resp:any)=>{
      this.lsNivel = resp.aaData;
      this.nivel = this.lsNivel[0];
      this.emitirEvento();
    });
  }

  //Emitir evento al hijo
  emitirEvento(){
    this.enviarNivel.next(this.nivel);  
  }

}
