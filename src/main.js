import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 全局elementPlus组件
import 'element-plus/dist/index.css'
import './elementPlus'
import './icons'

createApp(App).use(router).use(store).mount('#app')
