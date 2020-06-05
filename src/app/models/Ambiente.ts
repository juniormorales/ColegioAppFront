import { TipoAmbiente } from './tipoAmbiente';

export class Ambiente {
    public idAmbiente?: number;
    public numero?: number;
    public capacidad?: number;
    public estado?: boolean;
    public accion?: string;
    public tipoAmbiente?: TipoAmbiente = new TipoAmbiente();
}