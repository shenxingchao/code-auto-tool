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

router.beforeEach((to, from) => {
  //旧路由数组,还没有push了
  let route_list: any[] = store.state.route_list
  //找到当前激活的路由
  let active_index = route_list.findIndex((item: any) => item.active == true)

  //如果有路由数组且当前前往的路由是倒数第二个,那么就是返回上一页
  //这里有个问题，假如我前进的页面正好是我返回的页面，比如我点了面包屑导航,解决方案是如果是push的时候，传个自定义参数过来，如果有这个参数，那么就是push路由  router.push :to=" query 和 parm的区别
  if (
    active_index &&
    route_list.length > 1 &&
    route_list[active_index - 1].path == to.path
  ) {
    route_list.forEach((element: any) => {
      element.active = false
    })
    route_list[active_index - 1].active = true
  } else {
    //否则就是push了一个路由 并设为激活的路由
    route_list.forEach((element: any) => {
      element.active = false
    })
    route_list.push({ path: to.path, active: true })
  }
  store.dispatch('handleChangeRouteList', route_list)
})

export default router
