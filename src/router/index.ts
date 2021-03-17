import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

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

//路由前置钩子
/* router.beforeEach((to, from) => {
  //旧路由数组,还没有push了
  let route_list: any[] = store.state.route_list
  //找到当前激活的路由
  let active_index = route_list.findIndex((item: any) => item.active == true)

  if (active_index !== -1) {
    //如果上一个页面的路径=要去的路径，那么就是返回
    if (
      route_list[active_index].from_path == to.path &&
      route_list[active_index - 1]
    ) {
      route_list.forEach((element: any) => {
        element.active = false
      })
      //找到要去的路径，置为active
      route_list[active_index - 1].active = true
    }
    //如果下一个页面的路径=要去的路径，那么就是前进
    else if (
      route_list[active_index + 1] &&
      route_list[active_index + 1].to_path == to.path
    ) {
      route_list.forEach((element: any) => {
        element.active = false
      })
      //找到要去的路径，置为active
      route_list[active_index + 1].active = true
    } else {
      route_list.forEach((element: any) => {
        element.active = false
      })
      route_list.push({ to_path: to.path, from_path: from.path, active: true })
    }
  } else {
    //第一次进入 //把to,from全部放入堆栈
    route_list.push({ to_path: to.path, from_path: from.path, active: true })
  }
  store.dispatch('handleChangeRouteList', route_list)
}) */

export default router
