import { defineStore } from 'pinia'
import { Pago } from '@/domain/entities/Pago'
import { PagoRepositoryAPI } from '@/infraestructure/repositories/PagoRepositoryAPI'
import {
  ActualizarPago,
  EliminarPago,
  ObtenerPagoPorId,
  ObtenerPagos,
  ObtenerPagosPorAlumnoId,
  ObtenerPagosPorConceptoId,
  ObtenerPagosPorUsuarioId,
  RegistrarPago,
} from '@/core/use_cases/PagoUseCase'

export const usePagoStore = defineStore('pagoStore', {
  state: () => ({
    pagos: [] as Pago[],
    cargando: false,
  }),

  actions: {
    async obtenerPagos() {
      this.cargando = true
      const repo = new PagoRepositoryAPI()
      const useCase = new ObtenerPagos(repo)
      this.pagos = await useCase.execute()
      // console.log(this.pagos)
      this.cargando = false
    },

    async registrarPago(pago: Pago) {
      const repo = new PagoRepositoryAPI()
      const useCase = new RegistrarPago(repo)
      await useCase.execute(pago)
    },

    async acutalizarPago(pago: Pago) {
      const repo = new PagoRepositoryAPI()
      const useCase = new ActualizarPago(repo)
      await useCase.execute(pago)
    },

    async eliminarPago(id: number) {
      const repo = new PagoRepositoryAPI()
      const useCase = new EliminarPago(repo)
      await useCase.execute(id)
    },

    async buscarPagoPorId(id: number) {
      const repo = new PagoRepositoryAPI()
      const useCase = new ObtenerPagoPorId(repo)
      return await useCase.execute(id)
    },

    async buscarPagosPorAlumnoId(id: number) {
      const repo = new PagoRepositoryAPI()
      const useCase = new ObtenerPagosPorAlumnoId(repo)
      return await useCase.execute(id)
    },

    async buscarPagosPorConceptoId(id: number) {
      const repo = new PagoRepositoryAPI()
      const useCase = new ObtenerPagosPorConceptoId(repo)
      return await useCase.execute(id)
    },

    async buscarPagosPorUsuarioId(id: string) {
      const repo = new PagoRepositoryAPI()
      return await new ObtenerPagosPorUsuarioId(repo).execute(id)
    },

    async buscarTodosLosPagos() {
      const repo = new PagoRepositoryAPI()
      return await new ObtenerPagos(repo).execute()
    },
  },
})
