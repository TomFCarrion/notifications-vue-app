import { createRouter, createWebHistory } from 'vue-router'
import NotificationsView from '../views/NotificationsView.vue'
import CompanyView from '../views/CompanyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotificationsView
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyView
    }
  ]
})

export default router
