export class Usuario {
  constructor(
    public username: string,
    public nombres: string,
    public apellidos: string,
    public correo: string,
    public telefono: string,
    public password: string,
    public is_admin: boolean,
    public token?: string,
    public refreshToken?: string,
    public id?: number,
    public is_active?: boolean,
  ) {}
}
