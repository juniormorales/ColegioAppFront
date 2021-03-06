import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AmbienteRoutes } from './ambientes.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//Componentes
import { TipoAmbientesComponent } from './tipo-ambientes/tipo-ambientes.component';
import { AmbientesComponent } from './gestion-ambientes/ambientes.component';
import { PaginaAmbienteComponent } from './pagina-ambiente.component';

//Ngx
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

//Modals
import { NuevoAmbienteComponent } from './modals/nuevo-ambiente/nuevo-ambiente.component';
import { NuevoTipoAmbienteComponent } from './modals/nuevo-tipo-ambiente/nuevo-tipo-ambiente.component';

//Componentes Extras
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


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
    RouterModule.forChild(AmbienteRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AngularMultiSelectModule

  ],
  entryComponents: [
    NuevoAmbienteComponent,
    NuevoTipoAmbienteComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ PaginaAmbienteComponent]
  
})
export class AmbienteModule { }
