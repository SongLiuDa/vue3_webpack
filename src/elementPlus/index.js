import { createApp } from 'vue'
import { components } from './components'
const app = createApp({})

for (const component of components) {
  app.component(component.name, component)
}
