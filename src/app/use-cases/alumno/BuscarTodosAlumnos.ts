import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class BuscarTodosAlumnos {
  constructor(private alumnosRepository: IAlumnoRepository) {}
  async execute(): Promise<Alumno[]> {
    try {
      return await this.alumnosRepository.buscarTodos()
    } catch (error) {
      console.error('Error al buscar todos los alumnos', error)
      throw new Error('No se pudieron buscar todos los alumnos')
    }
  }
}
