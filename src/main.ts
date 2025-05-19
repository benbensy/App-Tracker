import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import Root from './Root.vue'
import { router } from './router'

import 'element-plus/theme-chalk/index.css'
import '@unocss/reset/tailwind-compat.css'

import 'uno.css'

import './styles/global.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const root = createApp(Root)

root
  .use(pinia)
  .use(router)
  .use(VueQueryPlugin)
  .mount('#root')
