export class Usuario {
  constructor(
    readonly id: number,
    public username: string,
    public nombres: string,
    public apellido_paterno: string,
    public apellido_materno: string,
    public correo: string,
    public telefono: string,
    public password: string,
    readonly is_superuser: boolean,
    readonly is_admin: boolean,
    readonly is_active: boolean,
    readonly last_login: string,
    readonly fecha_creacion: string,
    readonly fecha_modificacion: string,
  ) {}
}
