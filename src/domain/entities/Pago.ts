export class Pago {
  constructor(
    readonly folio?: string,
    readonly cadena?: string,
    public fecha?: string,
    public monto?: number,
    public comentario?: string,
    public creado?: string,
    public alumno?: string,
    public concepto?: string,
    public recibe?: string,
    public matricula?: string,
    public carrera?: string,
    public semestre?: number,
    public tipo?: 'E' | 'T',
  ) {}
}
