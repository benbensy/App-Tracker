import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    name: 'root',
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'home',
        path: '/',
        component: HomePage,
      },
    ],
  },
  {
    name: 'admin-root',
    path: '/admin',
    component: AdminLayout,
  },
] satisfies RouteRecordRaw[]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
