import { BuscarCarrerasUseCase } from '@/app/use-cases/carrera/BuscarCarrerasUseCase'
import type { Carrera } from '@/domain/entities/Carrera'
import { CarreraRepositoryAPI } from '@/infra/repositories/CarreraRepositoryAPI'
import { defineStore } from 'pinia'

export const useCarreraStore = defineStore('carrera', {
  state: () => ({
    carreras: [] as Carrera[] | null,
  }),
  actions: {
    async buscarTodos() {
      try {
        const repo = new CarreraRepositoryAPI()
        const useCase = new BuscarCarrerasUseCase(repo)
        this.carreras = await useCase.execute()
      } catch (error) {
        console.error(error)
      }
    },
  },
})
