<template>
  <div class="app-container">
    <el-row class="btn-back" type="flex" justify="start">
      <svg-icon name="back" className="icon" @click="router.back()" />
      <svg-icon name="add" className="icon" @click="router.push('AddTemplate')" />
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
//数据类型
interface ruleForm {
  title: string
}

export default defineComponent({
  name: 'TemplateList',
  setup() {
    //定义router
    const router = useRouter()

    //当前组件实例
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const global: any = internalInstance?.appContext.config.globalProperties
    //db实例
    const db = global.$db

    //静态变量

    return { router }
  },
})
</script>
