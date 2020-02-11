import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Testing from '../views/Testing.vue'
import TestingAthena from '../views/TestingAthena.vue'
import DemoTest from '../views/DemoTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/testing',
    name: 'testing',
    component: Testing
  },
  {
    path: '/testingAthena',
    name: 'testingAthena',
    component: TestingAthena
  },
  {
    path: '/demotest',
    name: 'DemoTest',
    component: DemoTest
  },
  {
    path: '/uniquedaily',
    name: 'UniqueDaily',
    component: () => import('../components/UniqueDailyCmp.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
