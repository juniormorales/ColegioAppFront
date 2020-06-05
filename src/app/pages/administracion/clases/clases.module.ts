import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes principales
import { ClasesComponent } from './clases.component';
import { GestionClasesComponent } from './gestion-clases/gestion-clases.component';

//Componentes Extras
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClasesRoutes } from './clases.routes';

@NgModule({
  declarations: [
    ClasesComponent, 
    GestionClasesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ClasesRoutes),
    NgxDatatableModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ ClasesComponent]
})
export class ClasesModule { }
