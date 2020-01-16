import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Testing from '../views/Testing.vue'
import TestingAthena from '../views/TestingAthena.vue'

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
]

const router = new VueRouter({
  routes
})

export default router
