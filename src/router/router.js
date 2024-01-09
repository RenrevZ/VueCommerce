import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component:  () => import('../view/LandingPage')
  },
  {
    path: '/product/category/:category',
    name:'ShowProductCategories',
    component: () => import('../view/ShowSingleCategories')
  },
  {
    path: '/product/:id',
    name:'ShowProduct',
    component: () => import('../view/ShowProduct')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router