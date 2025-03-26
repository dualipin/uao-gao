import type { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
  {
    meta: { admin: true },
    path: 'usuarios',
    name: 'usuarios',
    component: () => import('@/presentation/layouts/SectionLayout.vue'),
    children: [
      {
        name: 'listar-usuarios',
        path: '',
        component: () => import('@/presentation/views/usuarios/ListarUsuariosView.vue'),
      },
      {
        name: 'crear-usuario',
        path: 'crear',
        component: () => import('@/presentation/views/usuarios/CrearUsuarioView.vue'),
      },
      {
        name: 'editar-usuario',
        path: 'editar/:id',
        component: () => import('@/presentation/views/usuarios/EditarUsuarioView.vue'),
      },
      {
        name: 'ver-usuario',
        path: 'ver/:id',
        component: () => import('@/presentation/views/usuarios/VerUsuarioView.vue'),
      },
      {
        name: 'buscar-usuario',
        path: 'buscar',
        component: () => import('@/presentation/views/usuarios/BuscarUsuarioView.vue'),
      },
    ],
  },
]

export default router
