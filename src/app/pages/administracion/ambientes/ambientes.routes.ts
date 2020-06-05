import { Routes } from '@angular/router';
import { AmbientesComponent } from './gestion-ambientes/ambientes.component';
import { TipoAmbientesComponent } from './tipo-ambientes/tipo-ambientes.component';
import { PaginaAmbienteComponent } from './pagina-ambiente.component';

export const AmbienteRoutes: Routes = [
    {
        path: "",
        component: PaginaAmbienteComponent,
        children: [
            {
                path: "tipoambiente",
                component: TipoAmbientesComponent,
                data: {animation: 'isLeft'}
            },
            {
                path: "gestionambiente",
                component: AmbientesComponent,
                data: {animation: 'isRight'}
            }
        ]
    }
]