import type { Auth } from '@/domain/entities/Auth'
import type { IAuthRepository } from '@/domain/interfaces/AuthRepository'
import api from '../services/api'

export class AuthRepository implements IAuthRepository {
  private static readonly URL = '/token/'
  async login(username: string, password: string): Promise<Auth> {
    try {
      const response = await api.post(AuthRepository.URL, {
        username,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      return Promise.reject(null)
    }
  }
  async logout(token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async refreshToken(token: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
