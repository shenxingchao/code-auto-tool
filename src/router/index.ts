import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },
  //模板管理
  {
    path: '/Template',
    name: 'Template',
    component: () => import('@/views/Template/Template.vue'),
    children: [
      //模板列表
      {
        path: '/Template/TemplateList',
        name: 'TemplateList',
        component: () => import('@/views/Template/TemplateList.vue')
      },
      //添加模板
      {
        path: '/Template/AddTemplate',
        name: 'AddTemplate',
        component: () => import('@/views/Template/AddTemplate.vue')
      },
      //编辑模板
      {
        path: '/Template/EditTemplate',
        name: 'EditTemplate',
        component: () => import('@/views/Template/EditTemplate.vue')
      }
    ]
  },
  //控件管理
  {
    path: '/Control',
    name: 'Control',
    component: () => import('@/views/Control/Control.vue'),
    children: [
      //模板列表
      {
        path: '/Control/ControlList',
        name: 'ControlList',
        component: () => import('@/views/Control/ControlList.vue')
      },
      //添加模板
      {
        path: '/Control/AddControl',
        name: 'AddControl',
        component: () => import('@/views/Control/AddControl.vue')
      },
      //编辑模板
      {
        path: '/Control/EditControl',
        name: 'EditControl',
        component: () => import('@/views/Control/EditControl.vue')
      }
    ]
  },
  {
    path: '/Make',
    name: 'Make',
    component: () => import('@/views/Make/Make.vue'),
    children: [
      //生产步骤页
      {
        path: '/Make/MakeStep',
        name: 'MakeStep',
        component: () => import('@/views/Make/MakeStep.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
