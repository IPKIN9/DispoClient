import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Staff from '../views/Staff.vue'
import Mahasiswa from '../views/Mahasiswa.vue'
import Pengajuan from '../views/Pengajuan.vue'

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
      path: '/pengajuan',
      name: 'pengajuan',
      component: Pengajuan
    }
  ]
})

export default router
