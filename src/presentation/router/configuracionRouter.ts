import type { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
  {
    path: 'configuracion',
    name: 'configuracion',
    component: () => import('@/presentation/layouts/SectionLayout.vue'),
  },
]

export default router
