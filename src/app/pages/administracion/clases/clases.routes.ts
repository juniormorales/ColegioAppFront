import { Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { GestionClasesComponent } from './gestion-clases/gestion-clases.component';

export const ClasesRoutes: Routes = [
    {
        path: "",
        component: ClasesComponent,
        children: [
            {
                path: "gestionclase",
                component: GestionClasesComponent,
            },/*
            {
                path: "gestionambiente",
                component: AmbientesComponent,
                data: {animation: 'isRight'}
            }*/
        ]
    }
]