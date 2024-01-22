import { createRouter, createWebHistory } from 'vue-router'
import CommonLayout from '../layouts/CommonLayout.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: CommonLayout },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/c/:id',
    name: 'Conservation',
    meta: { layout: CommonLayout },
    component: () => import(/* webpackChunkName: "about" */ '../views/Conversation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
