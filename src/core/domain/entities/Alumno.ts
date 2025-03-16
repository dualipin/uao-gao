export class Alumno {
  constructor(
    public nombres: string,
    public apellidos: string,
    public fecha_ingreso?: string,
    public telefono?: string,
    public email?: string,
    public semestre?: number,
    public matricula?: string,
    public id?: number,
    public carrera?: number,
    public dia?: string,
  ) {
    this.fecha_ingreso = fecha_ingreso?.replace('/', '-')
  }
}
