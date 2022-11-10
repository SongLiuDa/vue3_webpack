import { components } from './components'

export function usElementPlus (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
