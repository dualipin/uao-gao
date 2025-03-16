import type { Usuario } from '../domain/entities/Usuario'
import type { UsuarioRepository } from '../domain/interfaces/UsuarioRepository'

export class UsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async getUsuarioById(id: number): Promise<Usuario> {
    return this.usuarioRepository.getUsuarioById(id)
  }

  async getUsuario(username: string): Promise<Usuario> {
    return this.usuarioRepository.getUsuario(username)
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.getUsuarios()
  }

  async createUsuario(usuario: Usuario): Promise<void> {
    return this.usuarioRepository.createUsuario(usuario)
  }

  async updateUsuario(usuario: Usuario): Promise<void> {
    return this.usuarioRepository.updateUsuario(usuario)
  }

  async deleteUsuario(id: number): Promise<void> {
    return this.usuarioRepository.deleteUsuario(id)
  }

  async login(username: string, password: string): Promise<Usuario> {
    return this.usuarioRepository.login(username, password)
  }

  async logout(): Promise<void> {
    return this.usuarioRepository.logout()
  }

  async register(usuario: Usuario): Promise<void> {
    return this.usuarioRepository.createUsuario(usuario)
  }
}
