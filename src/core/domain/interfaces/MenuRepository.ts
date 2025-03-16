import type { Menu } from '../entities/Menu'

export interface MenuRepository {
  getMenu(isAdmin: boolean): Menu[]
}
