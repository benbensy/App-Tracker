import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import DesignerLayout from '@/layouts/DesignerLayout.vue'
import DesignerHomePage from '@/pages/DesignerHomePage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    name: 'root',
    path: '/',
    component: BaseLayout,
    redirect: { name: 'home' },
    children: [
      {
        name: 'home',
        path: '/',
        component: HomePage,
      },
    ],
  },
  {
    name: 'designer-root',
    path: '/designer',
    component: DesignerLayout,
    redirect: { name: 'designer-home' },
    children: [
      {
        name: 'designer-home',
        path: '/designer',
        component: DesignerHomePage,
      },
    ],
  },
  {
    name: 'auth',
    path: '/auth',
    children: [
      {
        name: 'auth-sign-in',
        path: 'signIn',
        component: () => import('@/pages/SignInPage.vue'),
      },
      {
        name: 'auth-sign-up',
        path: 'signUp',
        component: () => import('@/pages/SignUpPage.vue'),
      },
    ],
  },

] satisfies RouteRecordRaw[]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
