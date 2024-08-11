import { createRouter, createWebHashHistory } from 'vue-router'

import LoanPage from '../views/LoanPage.vue'
import LoanDetail from '../views/LoanDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Loan',
    component: LoanPage
  },

  {
    path: '/loan-detail',
    name: 'Loan Detail',
    component: LoanDetail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
