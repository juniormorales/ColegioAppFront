import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AmbienteRoutes } from './ambientes.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//Componentes
import { TipoAmbientesComponent } from './tipo-ambientes/tipo-ambientes.component';
import { AmbientesComponent } from './gestion-ambientes/ambientes.component';
import { PaginaAmbienteComponent } from './pagina-ambiente/pagina-ambiente.component';

//Ngx
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

//Modals
import { NuevoAmbienteComponent } from './modals/nuevo-ambiente/nuevo-ambiente.component';
import { NuevoTipoAmbienteComponent } from './modals/nuevo-tipo-ambiente/nuevo-tipo-ambiente.component';



@NgModule({
  declarations: [
    AmbientesComponent,
    NuevoAmbienteComponent,
    TipoAmbientesComponent,
    NuevoTipoAmbienteComponent,
    PaginaAmbienteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    RouterModule.forChild(AmbienteRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    NuevoAmbienteComponent,
    NuevoTipoAmbienteComponent,
  ],
  bootstrap: [ PaginaAmbienteComponent]
  
})
export class AmbienteModule { }
