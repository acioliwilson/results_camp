import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin/audiences',
    name: 'audiences',
    component: () => import('../views/AudiencesView.vue')
  },
  {
    path: '/admin/audiences/add',
    name: 'add',
    component: () => import('../views/AddAudience.vue')
  },
  {
    path: '/admin/campaigns',
    name: 'campaigns',
    component: () => import('../views/CampaignsView.vue')
  },
  {
    path: '/admin/campaigns/add',
    name: 'campaign-add',
    component: () => import('../views/AddCampaign.vue')
  },
  {
    path: '/admin/campaigns/edit/:id',
    name: 'edit-campaign',
    component: () => import('../views/EditCampaign.vue')
  },
  {
    path: '/admin/campaigns/test/:id',
    name: 'test-campaign',
    component: () => import('../views/TestCampaign.vue')
  },
  {
    path: '/admin/campaigns/send/:id',
    name: 'send-campaign',
    component: () => import('../views/SendCampaign.vue')
  },
  {
    path: '/admin/campaigns/status/:id',
    name: 'status',
    component: () => import('../views/changeStatus.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/logOut.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
