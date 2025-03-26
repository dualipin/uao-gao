import { Menu } from '@/domain/entities/Menu'
import type { IMenuRepository } from '@/domain/interfaces/MenuRepository'

export class MenuRepositoryMock implements IMenuRepository {
  private normalMenu: Menu[] = [
    new Menu('Inicio', '/'),
    new Menu('Alumnos', '/alumnos'),
    new Menu('Pagos', '/pagos'),
    new Menu('Configuración', '/configuracion'),
  ]

  private adminMenu: Menu[] = [
    new Menu('Inicio', '/'),
    new Menu('Alumnos', { name: 'listar-alumnos' }, [
      new Menu('Registrar', { name: 'registrar-alumno' }),
    ]),
    new Menu('Pagos', { name: 'listar-pagos' }, [
      new Menu('Registrar', { name: 'registrar-pago' }),
      // new Menu('Actualizar', '/actualizar'),
      // new Menu('Ver', '/ver'),
      // new Menu('Editar', '/editar'),
    ]),
    new Menu('Usuarios', '/usuarios', [
      new Menu('Crear', '/crear'),
      new Menu('Buscar', '/buscar'),
    ]),
    new Menu('Configuración', '/configuracion'),
  ]

  getMenu(isAdmin: boolean): Menu[] {
    return isAdmin ? this.adminMenu : this.normalMenu
  }
}
