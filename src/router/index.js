import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Staff from '../views/Staff.vue'
import Mahasiswa from '../views/Mahasiswa.vue'
import Pengajuan from '../views/Pengajuan.vue'
import Ticket from '../views/Ticket.vue'
import Login from '../views/Login.vue'
import AuthCheck from '../utils/AuthCheck'

const envApp = import.meta.env.VITE_APP_ENV

const adminGuard = (to, from, next) => {
  let scope = AuthCheck.rolesCheck()

  if(scope && AuthCheck.envTransform(envApp) !== 'local') {
    if(scope === 'crud-list'){
      next()
    } else {
      next('/404_not_found')
    }
  }
  else {
    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    next('/login')
  }
}

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
      component: Staff,
      beforeEnter: adminGuard
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: Mahasiswa,
    },
    {
      path: '/pengajuan',
      name: 'pengajuan',
      component: Pengajuan
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
