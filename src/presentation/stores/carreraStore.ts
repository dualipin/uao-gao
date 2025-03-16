import type { Carrera } from '@/core/domain/entities/Carrera'
import { CarreraUseCase } from '@/core/use_cases/CarreraUseCase'
import { CarreraRepositoryAPI } from '@/infraestructure/repositories/CarreraRepositoryAPI'
import { defineStore } from 'pinia'

export const useStoreCarrera = defineStore('carrera', {
  state: () => ({
    cargando: false,
    carreras: [] as Carrera[],
    carrera: null as Carrera | null,
  }),
  actions: {
    async fetchCarreras() {
      this.cargando = true
      const repo = new CarreraRepositoryAPI()
      const useCase = new CarreraUseCase(repo)
      this.carreras = await useCase.getAll()
      this.cargando = false
    },
    async fetchCarrera(id: number) {
      this.cargando = true
      const repo = new CarreraRepositoryAPI()
      const useCase = new CarreraUseCase(repo)
      this.carrera = await useCase.getById(id)
      this.cargando = false
    },
  },
  persist: true,
})
