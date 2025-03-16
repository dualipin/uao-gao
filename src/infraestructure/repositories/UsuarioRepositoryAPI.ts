import type { Usuario } from '@/core/domain/entities/Usuario'
import type { UsuarioRepository } from '@/core/domain/interfaces/UsuarioRepository'
import api from '../services/api'

export class UsuarioRepositoryAPI implements UsuarioRepository {
  async getUsuarioById(id: number): Promise<Usuario> {
    try {
      const response = await api.get(`/usuarios/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener usuario', error)
      return Promise.reject(error)
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const response = await api.post('/token/refresh/', {
        refresh: token,
      })
      const newToken = response.data.access_token

      localStorage.setItem('access_token', newToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return newToken
    } catch (error) {
      console.error('Error al refrescar token', error)
      return ''
    }
  }
  async getUsuario(username: string): Promise<Usuario> {
    try {
      const response = await api.get(`/usuarios/buscar/${username}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener usuario', error)
      return Promise.reject(error)
    }
  }
  async getUsuarios(): Promise<Usuario[]> {
    try {
      return (await api.get('/usuarios')).data
    } catch (error) {
      console.error('Error al obtener usuarios', error)
      return Promise.reject(error)
    }
  }
  async createUsuario(usuario: Usuario): Promise<void> {
    try {
      await api.post('/usuarios', usuario)
    } catch (error) {
      console.error('Error al crear usuario', error)
      return Promise.reject(error)
    }
  }
  async updateUsuario(usuario: Usuario): Promise<void> {
    try {
      await api.put(`/usuarios/${usuario.id}`, usuario)
    } catch (error) {
      console.error('Error al actualizar usuario', error)
      return Promise.reject(error)
    }
  }
  async deleteUsuario(id: number): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`)
    } catch (error) {
      console.error('Error al eliminar usuario', error)
      return Promise.reject(error)
    }
  }
  async login(username: string, password: string): Promise<Usuario> {
    try {
      const response = await api.post('/token/', {
        username,
        password,
      })

      const token = response.data.access
      const refreshToken = response.data.refresh
      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refreshToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return this.getUsuario(username)
    } catch (error) {
      console.error('Error al iniciar sesion', error)
      return Promise.reject(error)
    }
  }
  logout(): Promise<void> {
    try {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete api.defaults.headers.common['Authorization']
    } catch (error) {
      console.error('Error al cerrar sesion', error)
    }
    return Promise.resolve()
  }
}
