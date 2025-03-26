import { createWebHistory, createRouter } from 'vue-router'

//routes
import authRoutes from './authRoutes'
import appRoutes from './appRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/presentation/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/presentation/layouts/SectionLayout.vue'),
          children: [...appRoutes],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/presentation/views/NotFoundView.vue'),
    },
    ...authRoutes,
  ],
})

export default router
