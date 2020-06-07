import { Ambiente } from './Ambiente';
import { Nivel } from './Nivel';
import { Grado } from './Grado';
import { Seccion } from './Seccion';
import { Turno } from './Turno';

export class Clase {
    idClases?: number;
    turno ?: Turno = new Turno();
    ambiente?: Ambiente = new Ambiente();
    nivel?: Nivel = new Nivel();
    grado?: Grado = new Grado();
    seccion? : Seccion = new Seccion();
    accion ?: string;
}