import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  //模板列表
  {
    path: '/TemplateList',
    name: 'TemplateList',
    component: () => import('../views/TemplateList.vue')
  },
  //创建模板
  {
    path: '/AddTemplate',
    name: 'AddTemplate',
    component: () => import('../views/AddTemplate.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
