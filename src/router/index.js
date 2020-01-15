import Vue from 'vue'
import VueRouter from 'vue-router'
import NumberPractice from '../views/practice/numbers/NumberPractice.vue'
import GrammarPractice from '../views/practice/grammar/GrammarPractice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GrammarPractice',
    component: GrammarPractice
  },
  {
    path: '/numbers',
    name: 'NumberPractice',
    component: NumberPractice
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
