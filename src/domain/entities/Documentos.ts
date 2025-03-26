export class DocumentosEntregados {
  constructor(
    readonly id: number,
    public acta_nacimiento: boolean,
    public curp: boolean,
    public certificado_bachillerato: boolean,
    public certificado_medico: boolean,
    public folder: boolean,
  ) {}
}
