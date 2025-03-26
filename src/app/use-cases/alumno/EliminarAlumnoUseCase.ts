import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class EliminarAlumnoUseCase {
  constructor(private readonly alumnoRepository: IAlumnoRepository) {}
  async execute(alumnoId: number): Promise<void> {
    try {
      await this.alumnoRepository.eliminar(alumnoId)
    } catch (error) {
      console.log('error en use case', error)
      throw new Error('Error al eliminar el usuario')
    }
  }
}
