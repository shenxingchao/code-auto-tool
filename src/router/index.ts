import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  //创建模板
  {
    path: '/CreateTemplate',
    name: 'CreateTemplate',
    component: () => import('../views/CreateTemplate.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
