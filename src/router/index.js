import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Staff from '../views/Staff.vue'
import Mahasiswa from '../views/Mahasiswa.vue'
import Ticket from '../views/Ticket.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: Mahasiswa
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    }
  ]
})

export default router
