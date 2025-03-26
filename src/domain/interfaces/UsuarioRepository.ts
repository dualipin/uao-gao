import type { Usuario } from '../entities/Usuario'

export interface IUsuarioRepository {
  buscarId(id: number): Promise<Usuario | null>
  buscarTodos(): Promise<Usuario[]>
  registrar(usuario: Usuario): Promise<void>
  actualizar(id: number, usuario: Usuario): Promise<void>
  eliminar(id: number): Promise<void>
  iniciarSesion(username: string, password: string): Promise<Usuario | null>
  cerrarSesion(refreshToken: string): Promise<void>
  refrescarToken(token: string): Promise<string>
}
