import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

export class Menu {
  constructor(
    public text: string,
    public to: RouteLocationAsRelativeGeneric | string | RouteLocationAsPathGeneric,
    public links?: Menu[],
  ) {}
}
