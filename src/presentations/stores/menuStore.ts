// import { MenuRepositoryMock } from '@/infraestructure/repositories/MenuRepositoryMock'
// import { defineStore } from 'pinia'
// import { useAuthStore } from './authStore'
// import type { Menu } from '@/domain/entities/Menu'

// export const menuStore = defineStore('menu', {
//   state: () => ({
//     menu: [] as Menu[],
//     indexToggle: null as number | null,
//   }),
//   actions: {
//     toggle(index: number) {
//       if (this.indexToggle === index) {
//         this.indexToggle = null
//       } else {
//         this.indexToggle = index
//       }
//     },
//   },
//   getters: {
//     getMenu: (state) => {
//       const authStore = useAuthStore()
//       const isAdmin = authStore.user?.is_admin

//       const repo = new MenuRepositoryMock()
//       state.menu = repo.getMenu(isAdmin!)

//       return state.menu
//     },
//   },
// })
