import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
// 全局elementPlus组件
import 'element-plus/dist/index.css'
import { usElementPlus } from '@/elementPlus'
import '@/styles/index.scss'
import './icons'

const app = createApp(App)
// 注册全局elementPlus
usElementPlus(app)

app.use(router).use(store).mount('#app')
