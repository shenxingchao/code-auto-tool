<template>
  <div class="app-container">
    <el-row class="btn-back" type="flex" justify="start">
      <svg-icon name="back" className="icon" @click="router.back()" />
      <svg-icon name="add" className="icon" @click="router.push('AddTemplate')" />
    </el-row>
    <el-table :data="data.list" style="width: 100%" border fit default-expand-all>
      <el-table-column prop="_id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="title" label="名称">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
} from 'vue'
import { useRouter } from 'vue-router'

//列表
interface List {
  _id: string
  title: string
}

//数据
interface Data {
  list: List[]
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

    //数据对象
    let data: Data = reactive({
      list: [],
    })

    //获取模板列表
    const getTemplateList = async () => {
      //分页获取记录
      await db.template.limit({}, 1, 10, { _id: -1 }).then((res: any) => {
        data.list = res
      })
    }

    //相当于mounted
    onMounted(async () => {
      await getTemplateList()
    })

    return { router, getTemplateList, data }
  },
})
</script>
