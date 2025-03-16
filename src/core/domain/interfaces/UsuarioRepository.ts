import type { Usuario } from '../entities/Usuario'

export interface UsuarioRepository {
  getUsuario(username: string): Promise<Usuario>
  getUsuarioById(id: number): Promise<Usuario>
  getUsuarios(): Promise<Usuario[]>
  createUsuario(usuario: Usuario): Promise<void>
  updateUsuario(usuario: Usuario): Promise<void>
  deleteUsuario(id: number): Promise<void>
  login(username: string, password: string): Promise<Usuario>
  logout(): Promise<void>
  refreshToken(token: string): Promise<string>
}
