import { GestionalumnosComponent } from './gestionalumnos/gestionalumnos.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlumnosRoutes } from './alumnos.routes';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Modulos formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//NgxBootstrap
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


//Swimlane
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


//Componentes Extras
import { NgSelectModule } from '@ng-select/ng-select';
import { FiltrarNivelGradoSeccion } from '../components/filtrar-nivel-grado-seccion/filtrar-nivel-grado-seccion.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { Registrostep2Component } from './registroalumnos/registrostep2/registrostep2.component';
import { Registrostep3Component } from './registroalumnos/registrostep3/registrostep3.component';
import { NavegacionRegistrosComponent } from './registroalumnos/registro/navegacion-registros.component';
import { Registrostep1Component } from './registroalumnos/registrostep1/registrostep1.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AlumnosRoutes),
      HttpClientModule,
      NgSelectModule,
      NgxDatatableModule,
      FormsModule,
      ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
      BsDatepickerModule.forRoot(),
      NgxSpinnerModule,
      ProgressbarModule.forRoot(),
      AngularMultiSelectModule,
      ComponentsModule,

    ],
    declarations: [
        GestionalumnosComponent,
        FiltrarNivelGradoSeccion,
        NavegacionRegistrosComponent,
        Registrostep2Component,
        Registrostep3Component,
        Registrostep1Component,
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
  })
  export class AlumnosModule {}