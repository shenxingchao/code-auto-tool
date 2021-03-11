<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <svg-icon name="back" className="icon" @click="router.back()" />
      <svg-icon name="add" className="icon" @click="router.push('AddTemplate')" />
    </el-row>
    <el-table :data="list" style="width: 100%" border fit default-expand-all>
      <el-table-column prop="_id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="title" label="名称">
      </el-table-column>
    </el-table>
    <el-row class="block">
      <el-pagination :current-page="page" :total="total" :page-sizes="page_sizes" :page-size="page_size" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-row>
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
import { useRouter } from 'vue-router'

//列表
interface List {
  _id: string
  title: string
}

//数据
interface Data {
  list: List[] //列表
  page: number //当前页
  page_size: number //分页数量
  page_sizes: number[] //分页数量选择
  total: number //总数
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
      page: 1,
      page_size: 1,
      page_sizes: [10, 20, 30, 50],
      total: 0,
    })

    //获取模板列表
    const getTemplateList = async () => {
      //获取总数
      await db.template.count({}).then((res: any) => {
        data.total = res
      })
      //分页获取记录
      await db.template
        .limit({}, data.page, data.page_size, { _id: -1 })
        .then((res: any) => {
          data.list = res
        })
    }

    //分页数量切换
    const handleSizeChange = (val: any) => {
      data.page_size = val
      getTemplateList()
    }

    //切换页码
    const handleCurrentChange = (val: any) => {
      data.page = val
      getTemplateList()
    }

    //相当于mounted
    onMounted(async () => {
      await getTemplateList()
    })

    return {
      router,
      ...toRefs(data),
      getTemplateList,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>
