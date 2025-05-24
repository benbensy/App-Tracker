import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: { name: 'home' },
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('@/pages/HomePage.vue'),
      },
    ],
  },
  {
    name: 'designer-root',
    path: '/designer',
    component: () => import('@/layouts/DesignerLayout.vue'),
    redirect: { name: 'designer-home' },
    children: [
      {
        name: 'designer-home',
        path: '',
        component: () => import('@/pages/DesignerHomePage.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router