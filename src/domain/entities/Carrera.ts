export class Carrera {
  constructor(
    public nombre: string,
    public readonly id?: number | null,
    readonly creado?: Date,
    readonly modificado?: Date,
    public duracion?: number,
  ) {}
}
