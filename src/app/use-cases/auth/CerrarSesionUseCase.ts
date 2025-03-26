import type { IAuthRepository } from '@/domain/interfaces/AuthRepository'

export class CerrarSesionUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(token: string): Promise<void> {
    try {
      return await this.authRepository.logout(token)
    } catch (error) {
      console.error('Error al cerrar sesión', error)
      return Promise.reject(null)
    }
  }
}
