import type { Auth } from '@/domain/entities/Auth'
import type { IAuthRepository } from '@/domain/interfaces/AuthRepository'

export class IniciarSesionUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(username: string, password: string): Promise<Auth> {
    try {
      return await this.authRepository.login(username, password)
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      return Promise.reject(error)
    }
  }
}
