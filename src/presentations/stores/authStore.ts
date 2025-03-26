// import { defineStore } from 'pinia'
// import { UsuarioRepositoryAPI } from '@/infraestructure/repositories/UsuarioRepositoryAPI'
// import { UsuarioUseCase } from '@/core/use_cases/UsuarioUseCase'
// import type { Usuario } from '@/domain/entities/Usuario'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     loading: false,
//     token: localStorage.getItem('access_token') || '',
//     refreshToken: localStorage.getItem('refresh_token') || '',
//     user: null as Usuario | null,
//   }),

//   persist: true,

//   actions: {
//     async login(username: string, password: string) {
//       this.loading = true
//       const repo = new UsuarioRepositoryAPI()
//       const useCase = new UsuarioUseCase(repo)

//       try {
//         this.user = await useCase.login(username, password)
//       } catch (error) {
//         console.error('Error al iniciar sesión', error)
//         return null
//       }

//       this.loading = false

//       return this.user
//     },

//     async refreshAccessToken() {
//       const repo = new UsuarioRepositoryAPI()
//       const newToken = await repo.refreshToken(this.refreshToken)
//       this.token = newToken
//     },

//     async logout() {
//       this.token = ''
//       this.refreshToken = ''

//       const repo = new UsuarioRepositoryAPI()
//       const useCase = new UsuarioUseCase(repo)

//       await useCase.logout()

//       this.user = null
//     },
//   },
// })
