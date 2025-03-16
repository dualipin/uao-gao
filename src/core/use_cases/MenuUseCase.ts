import type { Menu } from '../domain/entities/Menu'
import type { MenuRepository } from '../domain/interfaces/MenuRepository'

export class MenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async getMenu(isAdmin: boolean): Promise<Menu[]> {
    return this.menuRepository.getMenu(isAdmin)
  }
}
