import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Staff from '../views/Staff.vue'
import Mahasiswa from '../views/Mahasiswa.vue'
import Pengajuan from '../views/Pengajuan.vue'
import Ticket from '../views/Ticket.vue'
import Login from '../views/Login.vue'
import AuthCheck from '../utils/AuthCheck'

const envApp = import.meta.env.VITE_APP_ENV

const userGuard = (to, from, next) => {
  if (AuthCheck.envTransform(envApp) !== 'local' || AuthCheck.userToken === 200) {
    next()
  } else {
    localStorage.removeItem('user')
    localStorage.removeItem('scope')
    next('/login')
  }
}

const adminGuard = (to, from, next) => {
  let scope = AuthCheck.rolesCheck()

  if(scope) {
    if(scope === 'crud-list'){
      next()
    } else {
      next('/')
    }
  }
  else {
    localStorage.removeItem('user')
    localStorage.removeItem('scope')
    next('/login')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: userGuard
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      beforeEnter: userGuard
    },
    {
      path: '/mahasiswa',
      name: 'mahasiswa',
      component: Mahasiswa,
      beforeEnter: userGuard
    },
    {
      path: '/pengajuan',
      name: 'pengajuan',
      component: Pengajuan,
      beforeEnter: userGuard
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket,
      beforeEnter: userGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
