import { IniciarSesionUseCase } from '@/app/use-cases/auth/IniciarSesionUseCase'
import type { Auth } from '@/domain/entities/Auth'
import { AuthRepository } from '@/infra/repositories/AuthRepository'

import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    auth: {
      refresh: localStorage.getItem('access_token') || '',
      access: localStorage.getItem('refresh_token') || '',
    } as Auth,
  }),
  persist: true,
  actions: {
    async login(username: string, password: string): Promise<Auth | null> {
      this.loading = true
      const repo = new AuthRepository()
      const useCase = new IniciarSesionUseCase(repo)
      try {
        const res = await useCase.execute(username, password)
        console.log('res', res)
      } catch (error) {
        console.error('Error al iniciar sesión', error)
        return null
      }
      this.loading = false
      return this.auth
    },
    async logout(): Promise<void> {
      const repo = new AuthRepository()
      try {
        await repo.logout(this.auth.refresh)
      } catch (error) {
        console.error('Error al cerrar sesión', error)
        return Promise.reject(null)
      }
      this.auth = {
        access: '',
        refresh: '',
      }
    },
  },
})
