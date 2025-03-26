import type { Auth } from '../entities/Auth'
import type { Usuario } from '../entities/Usuario'

export interface IAuthRepository {
  login(username: string, password: string): Promise<Auth>
  obtenerUsuario(): Promise<Usuario>
  logout(refreshToken: string): Promise<void>
  refreshToken(token: string): Promise<string>
}
