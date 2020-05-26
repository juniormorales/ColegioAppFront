import { Routes } from '@angular/router';
import { GestionalumnosComponent } from './gestionalumnos/gestionalumnos.component';
import { NavegacionRegistrosComponent } from './registroalumnos/registro/navegacion-registros.component';

export const AlumnosRoutes: Routes = [
    {
      path: "",
      children: [
        {
          path: "gestionalumnos",
          component: GestionalumnosComponent
        },
        {
          path: "registroalumno",
          component: NavegacionRegistrosComponent
        }
      ]
    }
  ];
  