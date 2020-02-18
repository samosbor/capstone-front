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
    path: '/uniquedaily',
    name: 'UniqueDaily',
    component: () => import('../views/UniqueDaily.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
