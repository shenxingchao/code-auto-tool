<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Control/ControlList' }">生成</el-breadcrumb-item>
        <el-breadcrumb-item>生成步骤</el-breadcrumb-item>
      </el-breadcrumb>
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-steps :active="0" finish-status="success" simple>
      <el-step title="选择模板" icon="el-icon-check"></el-step>
      <el-step title="设置变量" icon="el-icon-edit"></el-step>
      <el-step title="下载代码" icon="el-icon-download"></el-step>
    </el-steps>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
} from 'vue'

import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'MakeStep',
  setup() {
    //定义router
    const router = useRouter()
    const route = useRoute()

    //当前组件实例
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const global: any = internalInstance?.appContext.config.globalProperties
    //db实例
    const db = global.$db

    //静态变量

    return {
      router,
      route,
    }
  },
})
</script>
