<template>
  <div class="container">
    <div class="primary-btn-group">
      <el-button class="btn" type="primary" @click="handleClickCreate()">
        <svg-icon name="create" className="icon" />创建一个模板
      </el-button>
      <el-button class="btn" type="warning">
        <svg-icon name="make" className="icon" />生成
      </el-button>
    </div>
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
    //创建模板
    const handleClickCreate = () => {
      router.push('CreateTemplate')
    }
    //随便测一个
    // db.find({ a: 3 }).then((res: any) => {
    //   console.log(res)
    // })

    return { handleClickCreate }
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
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
      fill: #ffffff !important;
      margin-right: 10px;
    }
  }
}
</style>