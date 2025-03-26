import type { Menu } from '../entities/Menu'

export interface IMenuRepository {
  getMenu(isAdmin: boolean): Menu[]
}
