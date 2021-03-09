<template>
  <el-button type="primary">hello elementui</el-button>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    //当前组件实例 # https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance
    const internalInstance = getCurrentInstance()
    //访问 globalProperties
    const db = internalInstance?.appContext.config.globalProperties.$db

    //随便测一个
    db.find({}).then((res: any) => {
      console.log(res)
    })
  },
})
</script>
