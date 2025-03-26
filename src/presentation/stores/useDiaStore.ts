import { BuscarDiasUseCase } from '@/app/use-cases/alumno/BuscarDiasUseCase'
import type { Dia } from '@/domain/entities/Dia'
import { DiaRepositoryAPI } from '@/infra/repositories/DiaRepositoryApi'
import { defineStore } from 'pinia'

export const useDiaStore = defineStore('dia', {
  state: () => ({
    dias: [] as Dia[] | null,
  }),

  actions: {
    async buscarTodos() {
      try {
        const repo = new DiaRepositoryAPI()
        const useCase = new BuscarDiasUseCase(repo)
        this.dias = await useCase.execute()
      } catch (error) {
        console.error(error)
      }
    },
  },
})
