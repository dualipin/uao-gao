import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import authRoutes from './authRoutes'
import AppLayout from '@/presentation/layouts/AppLayout.vue'
import HomeView from '@/presentation/views/HomeView.vue'
import pagosRouter from '@/presentation/router/pagosRouter'
import alumnosRouter from '@/presentation/router/alumnosRouter'
import usuariosRouter from '@/presentation/router/usuariosRouter'
import configuracionRouter from '@/presentation/router/configuracionRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          name: 'inicio',
          path: '',
          component: HomeView,
        },
        ...pagosRouter,
        ...alumnosRouter,
        ...usuariosRouter,
        ...configuracionRouter,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'inicio' },
    },
    ...authRoutes,
  ],
})

//agregar middleware para verificar si el usuario está autenticado
router.beforeEach((to, from, next) => {
  const store = useAuthStore()

  if (to.meta?.admin && !store.user?.is_admin) {
    next('/')
  } else if (store.user == null && to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
})

export default router
