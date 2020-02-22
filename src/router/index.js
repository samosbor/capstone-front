import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestingAthena from '../views/TestingAthena.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/testingAthena',
    name: 'testingAthena',
    component: TestingAthena
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('../views/Daily.vue')
  },
  {
    path: '/weekly',
    name: 'Weekly',
    component: () => import('../views/Weekly.vue')
  },
  {
    path: '/monthly',
    name: 'Monthly',
    component: () => import('../views/Monthly.vue')
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: () => import('../views/Campaigns.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
