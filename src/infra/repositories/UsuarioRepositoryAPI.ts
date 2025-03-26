import type { Usuario } from '@/domain/entities/Usuario'
import type { IUsuarioRepository } from '@/domain/interfaces/UsuarioRepository'
import api from '../services/api'

export class UsuarioRepositoryAPI implements IUsuarioRepository {
  private static readonly BASE_URL: string = '/usuarios'

  buscarId(id: number): Promise<Usuario | null> {
    if (id <= 0) {
      return Promise.reject(new Error('El id debe ser mayor a 0'))
    }
    try {
      return api.get(`${UsuarioRepositoryAPI.BASE_URL}/${id}/`)
    } catch (error) {
      console.error('Error al buscar usuario por id', error)
      return Promise.reject(error)
    }
  }
  buscarTodos(): Promise<Usuario[]> {
    try {
      return api.get(UsuarioRepositoryAPI.BASE_URL)
    } catch (error) {
      console.error('Error al buscar todos los usuarios', error)
      return Promise.resolve([])
    }
  }
  registrar(usuario: Usuario): Promise<void> {
    try {
      return api.post(UsuarioRepositoryAPI.BASE_URL, usuario)
    } catch (error) {
      console.error('Error al registrar usuario', error)
      return Promise.reject(error)
    }
  }
  actualizar(id: number, usuario: Usuario): Promise<void> {
    if (id <= 0) {
      return Promise.reject(new Error('El id debe ser mayor a 0'))
    }
    try {
      return api.put(`${UsuarioRepositoryAPI.BASE_URL}/${id}/`, usuario)
    } catch (error) {
      console.error('Error al actualizar usuario', error)
      return Promise.reject(error)
    }
  }
  eliminar(id: number): Promise<void> {
    if (id <= 0) {
      return Promise.reject(new Error('El id debe ser mayor a 0'))
    }
    try {
      return api.delete(`${UsuarioRepositoryAPI.BASE_URL}/${id}/`)
    } catch (error) {
      console.error('Error al eliminar usuario', error)
      return Promise.reject(error)
    }
  }
  iniciarSesion(username: string, password: string): Promise<Usuario | null> {
    try {
      return api.post('/login/', { username, password })
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      return Promise.reject(error)
    }
  }
  cerrarSesion(refreshToken: string): Promise<void> {
    try {
      return api.post('token/logout/', { refresh: refreshToken })
    } catch (error) {
      console.error('Error al cerrar sesión', error)
      return Promise.reject(error)
    }
  }
  refrescarToken(token: string): Promise<string> {
    try {
      return api.post('/token/refresh/', { refresh: token })
    } catch (error) {
      console.error('Error al refrescar token', error)
      return Promise.reject(error)
    }
  }
}
