import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/pagos',
    name: 'pagos',
    component: () => import('@/presentation/layouts/SectionLayout.vue'),
    children: [
      {
        name: 'listar-pagos',
        path: '',
        component: () => import('@/presentation/views/pagos/ListarPagosView.vue'),
      },
      {
        name: 'registrar-pago',
        path: 'registrar-pago',
        component: () => import('@/presentation/views/pagos/RegistrarPagoView.vue'),
      },
      {
        name: 'ver-pago',
        path: ':id',
        component: () => import('@/presentation/views/pagos/VerPagoView.vue'),
      },
      {
        name: 'actualizar-pago',
        path: ':id/actualizar',
        component: () => import('@/presentation/views/pagos/ActualizarPagoView.vue'),
      },
    ],
  },
]

export default routes
