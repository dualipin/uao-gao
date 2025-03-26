import { IniciarSesionUseCase } from '@/app/use-cases/auth/IniciarSesionUseCase'
import type { Usuario } from '@/domain/entities/Usuario'
import { AuthRepository } from '@/infra/repositories/AuthRepository'
import { UsuarioRepositoryAPI } from '@/infra/repositories/UsuarioRepositoryAPI'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): {
    loading: boolean
    token: string
    refreshToken: string
    user: null | Usuario
  } => ({
    loading: false,
    token: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    user: null,
  }),
  actions: {
    async login(username: string, password: string): Promise<Usuario | null> {
      this.loading = true
      try {
        const authRepository = new AuthRepository()
        const iniciarSesionUseCase = new IniciarSesionUseCase(authRepository)

        await iniciarSesionUseCase.execute(username, password)
      } catch (error) {
        console.error('Error al iniciar sesión', error)
        return null
      }
      this.loading = false
      return this.user
    },
  },
})
