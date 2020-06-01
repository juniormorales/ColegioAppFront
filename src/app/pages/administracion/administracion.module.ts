//Angular components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes principales
import { AdministracionRoutes } from './administracion.routes';

//Modulos
import { AmbienteModule } from './ambientes/ambiente.module';


//Componentes extras
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(AdministracionRoutes),
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    AmbienteModule
  ]
})
export class AdministracionModule { }
