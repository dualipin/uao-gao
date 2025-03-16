export class Pago {
  constructor(
    public folio: string,
    public cadena: string,
    public fecha: string,
    public monto: number,
    public comentario: string,
    public creado: string,
    public alumno: string,
    public concepto: string,
    public recibe: string,
    public matricula: string,
    public carrera: string,
    public semestre: string,
    public tipo?: string,
  ) {}
}
