import type { Carrera } from './Carrera'
import type { Dia } from './Dia'
import type { Direccion } from './Direccion'
import type { DocumentosEntregados } from './Documentos'

export class Alumno {
  constructor(
    readonly id: number,
    public dias: Dia[] | null,
    public documentos_entregados: DocumentosEntregados | null,
    public nombres: string,
    public apellido_paterno: string,
    public apellido_materno: string,
    public correo: string | null,
    public telefono: string | null,
    public is_active: boolean,
    readonly fecha_creacion: string | null,
    readonly fecha_modificacion: string | null,
    public matricula: string | null,
    public semestre: number,
    public fecha_ingreso: string,
    public carrera: Carrera,
    public observaciones: string | null,
    public direccion: Direccion | null,
  ) {}
}
