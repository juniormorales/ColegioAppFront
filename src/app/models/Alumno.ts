import { Persona } from './Persona';

export class Alumno{

    public idAlumno:number;
    public promedioGeneral?:number;
    public anosEstudio:number;
    public nroRepitencias:number;
    public colegioProcedencia: string;
    public familia: string;
    public estado:number;
    public persona: Persona = new Persona();
}