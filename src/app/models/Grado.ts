import { Nivel } from './Nivel';

export class Grado {
  idGrado?: number;
  descripcion: String;
  nivel?: Nivel  = new Nivel();
}
