import { defineStore } from 'pinia'

export const useAlumnoStore = defineStore('alumnos', {
  state: () => ({
    s: 10,
  }),
})
