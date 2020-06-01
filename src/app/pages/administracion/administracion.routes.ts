import { Routes } from '@angular/router';
import { AmbientesComponent } from './ambientes/gestion-ambientes/ambientes.component';
import { TipoAmbientesComponent } from './ambientes/tipo-ambientes/tipo-ambientes.component';

export const AdministracionRoutes: Routes = [
    {
        path: "",
        children: [
            {
               
            
            }
        ],
        loadChildren:  "./ambientes/ambiente.module#AmbienteModule"
    }
]