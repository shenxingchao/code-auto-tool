<template>
  <el-button type="primary">hello elementui</el-button>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance() as any
    //随便测一个
    console.log(ctx.$db)
    ctx.$db.insert({ a: 5 }).then((res: any) => {
      console.log(res)
    })
  },
})
</script>
