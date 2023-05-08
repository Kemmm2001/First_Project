import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import('../views/ListView.vue'),
  },
  {
    path: '/tdList',
    name: 'tdList',
    component: () => import('../views/TodoList.vue'),
  },
  
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
