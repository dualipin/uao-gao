import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'principal',
    component: HomeView,
  },
  {
    path: 'alumnos',
    children: [
      {
        path: '',
        name: 'alumnos',
        component: () => import('../views/alumno/ListarAlumnoView.vue'),
      },
      {
        path: 'registro',
        name: 'registro-alumno',
        component: () => import('../views/alumno/RegistrarAlumnoView.vue'),
      },
      {
        path: 'editar/:id',
        name: 'actualizar-alumno',
        component: () => import('../views/alumno/ActualizarAlumnoView.vue'),
      },
      {
        path: 'ver/:id',
        name: 'ver-alumno',
        component: () => import('../views/alumno/VerAlumnoView.vue'),
      },
    ],
  },
  {
    path: 'pagos',
    children: [
      {
        path: '',
        name: 'pagos',

        component: () =>
          import('@/presentation/views/pagos/ListarPagosView.vue'),
      },
      {
        path: 'registro',
        name: 'registrar-pago',
        component: () =>
          import('@/presentation/views/pagos/RegistrarPagoView.vue'),
      },
      {
        path: 'ver/:id',
        name: 'ver-pago',
        component: () => import('@/presentation/views/pagos/VerPagoView.vue'),
      },
    ],
  },
]

export default routes
