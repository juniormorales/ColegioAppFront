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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';

//Swimlane
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//NgBootstrap
import { NgbModule, NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Componentes principales
import { MostrarDetallesAlumnoComponent } from './gestionalumnos/modals/mostrar-detalles-alumno/mostrar-detalles-alumno.component';
import { NavegacionRegistrosComponent } from './registroalumnos/registro/navegacion-registros.component';
import { Registrostep1Component } from './registroalumnos/registrostep1/registrostep1.component';
import { Registrostep2Component } from './registroalumnos/registrostep2/registrostep2.component';
import { Registrostep3Component } from './registroalumnos/registrostep3/registrostep3.component';

//Componentes Extras
import { NgSelectModule } from '@ng-select/ng-select';
import { FiltrarNivelGradoSeccion } from '../components/filtrar-nivel-grado-seccion/filtrar-nivel-grado-seccion.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatriculaComponent } from './matricula/matricula.component';
import { InformacionPersonalComponent } from './gestionalumnos/modals/mostrar-detalles-alumno/informacion-personal/informacion-personal.component';
import { HistorialAcademicoComponent } from './gestionalumnos/modals/mostrar-detalles-alumno/historial-academico/historial-academico.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AlumnosRoutes),
      HttpClientModule,
      NgxDatatableModule,
      FormsModule,
      ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      NgxSpinnerModule,
      ProgressbarModule.forRoot(),
      AngularMultiSelectModule,
      ComponentsModule,
      NgbModule,
      NgbModalModule,
      AlertModule.forRoot(),

    ],
    declarations: [
        GestionalumnosComponent,
        FiltrarNivelGradoSeccion,
        NavegacionRegistrosComponent,
        Registrostep2Component,
        Registrostep3Component,
        Registrostep1Component,
        MostrarDetallesAlumnoComponent,
        MatriculaComponent,
        InformacionPersonalComponent,
        HistorialAcademicoComponent,
    ],
    entryComponents: [
      MostrarDetallesAlumnoComponent
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
      NgbActiveModal
    ]
  })
  export class AlumnosModule {}