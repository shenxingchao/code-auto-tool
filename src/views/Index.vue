<template>
  <div class="container">
    <div class="primary-btn-group">
      <el-button class="btn" type="primary" @click="handleClickTemplateList()">
        <svg-icon name="template_list" className="icon" />模板管理
      </el-button>
      <el-button class="btn" type="warning" @click="router.push('/Make/MakeStep')">
        <svg-icon name="make" className="icon" />生成
      </el-button>
    </div>
    <el-row type="flex" justify="center" align="middle">
      <h3>create based on vue3 + electron11 + element-plus</h3>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    //当前组件实例 # https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const db = internalInstance?.appContext.config.globalProperties.$db

    //定义router
    const router = useRouter()
    const route = useRoute()

    //模板管理
    const handleClickTemplateList = () => {
      router.push('/Template/TemplateList')
    }

    return { router, route, handleClickTemplateList }
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.primary-btn-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
      fill: $white !important;
      margin-right: 10px;
    }
  }
}
</style>