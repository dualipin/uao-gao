export class Direccion {
  constructor(
    readonly id: number,
    public calle: string,
    public numeroExt: number,
    public numeroInt: number | null,
    public colonia: string,
    public municipio: string,
    public estado: string,
    public codigoPostal: string,
  ) {}
}
