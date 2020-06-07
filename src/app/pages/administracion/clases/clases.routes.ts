import { Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { GestionClasesComponent } from './gestion-clases/gestion-clases.component';
import { GrupoComponent } from './grupo/grupo.component';

export const ClasesRoutes: Routes = [
    {
        path: "",
        component: ClasesComponent,
        children: [
            {
                path: "gestionclase",
                component: GestionClasesComponent,
                data: {animation: 'isLeft'}
            },
            {
                path: "grupo",
                component: GrupoComponent,
                data: {animation: 'isRight'}
            }
        ]
    }
]