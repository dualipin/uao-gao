import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router'

export type Link = {
  to: string | RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric
  text: string
  links?: Link[]
  onlyAdmin?: boolean
  onlyUser?: boolean
}
