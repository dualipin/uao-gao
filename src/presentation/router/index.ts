import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
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
      path: '/login',
      name: 'login',
      component: () => import('@/presentation/views/LoginView.vue'),
    },
    // {
    //   path: '/reporte',
    //   name: 'reporte',
    //   component: () => import('@/presentation/'),
    // },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'inicio' },
    },
  ],
})

//add middleware to check if user is authenticated
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
