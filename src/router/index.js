import Vue from 'vue'
import VueRouter from 'vue-router'
import NumberPractice from '../views/practice/numbers/NumberPractice.vue'
import GrammarPractice from '../views/practice/grammar/GrammarPractice.vue'
import GrammarType from '../views/practice/grammar/GrammarType.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/grammar',
    name: 'GrammarPractice',
    component: GrammarPractice
  },
  {
    path: '/grammartype',
    name: 'GrammarType',
    component: GrammarType
  },
  {
    path: '/',
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
