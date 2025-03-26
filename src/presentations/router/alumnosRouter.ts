import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'alumnos',
    name: 'alumnos',
    component: () => import('@/presentation/layouts/SectionLayout.vue'),
    children: [
      {
        name: 'listar-alumnos',
        path: '',
        component: () => import('@/presentation/views/alumnos/ListarAlumnos.vue'),
      },
      {
        name: 'registrar-alumno',
        path: 'registrar',
        component: () => import('@/presentation/views/alumnos/RegistrarAlumnoView.vue'),
      },
      {
        name: 'ver-alumno',
        path: 'ver/:id',
        component: () => import('@/presentation/views/alumnos/VerAlumnoView.vue'),
      },
      {
        name: 'editar-alumno',
        path: 'editar/:id',
        component: () => import('@/presentation/views/alumnos/EditarAlumnoView.vue'),
      },
    ],
  },
]

export default routes
