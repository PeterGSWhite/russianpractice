import Vue from 'vue'
import VueRouter from 'vue-router'
import OneToTen from '../views/practice/numbers/OneToTen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OneToTen',
    component: OneToTen
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
