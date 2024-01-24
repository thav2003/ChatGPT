import { createRouter, createWebHistory } from 'vue-router'
import CommonLayout from '../layouts/CommonLayout.vue'
import LayoutA from '../layouts/LayoutA.vue'
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
    component: () => import(/* webpackChunkName: "conservation" */ '../views/Conversation.vue')
  },
  {
    path: '/feedback-export',
    name: 'FeedbackExport',
    meta: { layout: LayoutA },
    component: () => import(/* webpackChunkName: "feedbackExport" */ '../views/FeedbackExport.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
