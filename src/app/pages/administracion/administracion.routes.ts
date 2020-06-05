import { Routes } from '@angular/router';

export const AdministracionRoutes: Routes = [
    {
        path: "ambientes",
        loadChildren:  "./ambientes/ambiente.module#AmbienteModule"
    },
    {
        path: "clases",
        loadChildren:  "./clases/clases.module#ClasesModule"
    }
]