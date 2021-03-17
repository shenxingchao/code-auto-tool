<template>
  <div class="app-container">
    <custome-table :data="list" :table-head="table_head" :params="params" :show-selection="true" :isRadio="false"
                   :optWidth="120" :showOpt="true" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange"
                   @handleRowDblClick="handleRowDblClick" @handleEdit="handleEdit" @handleDelete="handleDelete">
      <template v-slot:searchBar>
        <el-form ref="searchFormRef" :inline="true" :model="params" class="demo-form-inline" size="mini">
          <el-form-item prop="keyword">
            <el-input v-model="params.keyword" placeholder="搜索关键词" />
          </el-form-item>
          <el-form-item prop="type">
            <el-select v-model="params.type" placeholder="请选择控件类型" clearable>
              <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="onReset">重置
            </el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini"
                       @click="router.push({path:'/Control/AddControl',query:{template_id: route.query.template_id}})">
              添加
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteRows">删除</el-button>
          </el-form-item>
        </el-form>
      </template>
    </custome-table>
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
import CustomeTable from '@/components/CustomTable.vue'
//列表
interface List {
  _id: string
  title: string
}

//分页对象
interface Params {
  page: number //当前页
  page_size: number //分页数量
  page_sizes: number[] //分页数量选择
  total: number //总数
  keyword: string //搜索关键词
  type: number | string //控件类型 枚举值 1基础控件 2循环控件
}

//数据
interface Data {
  list: List[] //列表
  params: Params //分页对象
  selection_id_list: any[] //选择的ID列表 这里是nedb的_id
}

export default defineComponent({
  name: 'ControlList',
  components: {
    CustomeTable,
  },
  setup() {
    //定义router
    const router = useRouter()
    const route = useRoute()

    //搜索dom对象
    let searchFormRef: any = ref(null)

    //当前组件实例
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const global: any = internalInstance?.appContext.config.globalProperties
    //db实例
    const db = global.$db

    //静态变量
    const table_head = [
      {
        label: '控件编号',
        prop: '_id',
        width: 150,
      },
      {
        label: '名称',
        prop: 'title',
      },
      {
        label: '类型',
        prop: 'type',
        width: 80,
        render: (row: any) => {
          return row.type == 1 ? '基础控件' : '循环控件'
        },
      },
      {
        label: '创建时间',
        prop: 'add_time',
        width: 150,
        render: (row: any) => {
          return global
            .$moment(Number(row.add_time))
            .format('YYYY-MM-DD kk:mm:ss')
        },
      },
    ]

    //控件类型
    const type_options = [
      {
        label: '基础控件',
        value: 1,
      },
      {
        label: '循环控件',
        value: 2,
      },
    ]

    //数据对象
    let data: Data = reactive({
      list: [],
      params: {
        page: 1,
        page_size: 10,
        page_sizes: [10, 20, 30, 50],
        total: 0,
        keyword: '',
        type: '',
      },
      selection_id_list: [],
    })

    //获取列表
    const getControlList = async () => {
      //搜索条件
      let query: any = {}
      //使用$and条件可扩展匹配多个
      query.$and = [{ template_id: route.query.template_id }]
      if (data.params.keyword != '') {
        query.$and.push({
          title: new RegExp('.*?' + data.params.keyword + '.*?'),
        })
      }
      if (data.params.type != '') {
        query.$and.push({
          type: data.params.type,
        })
      }
      //获取总数
      await db.control.count(query).then((res: any) => {
        data.params.total = res
      })
      //分页获取记录
      await db.control
        .limit(query, data.params.page, data.params.page_size, { add_time: -1 })
        .then((res: any) => {
          data.list = res
        })
    }

    //切换选择数据
    const handleSelectionChange = (val: any[]) => {
      data.selection_id_list = val
    }

    //双击编辑
    const handleRowDblClick = (val: any) => {
      router.push({
        path: '/Control/EditControl',
        query: {
          _id: val,
        },
      })
    }

    //编辑
    const handleEdit = (index: number, row: any) => {
      handleRowDblClick(row._id)
    }

    //删除
    const handleDelete = (index: number, row: any) => {
      global
        .$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          //删除条件 单个id
          let query = {
            _id: row._id,
          }
          //删除操作
          await db.control.remove(query, { multi: true }).then((res: any) => {
            if (res > 0) {
              global.$message.success({
                message: '删除成功',
              })
            }
          })
          getControlList()
        })
        .catch(() => {
          global.$message.error({
            message: '已取消删除',
          })
        })
    }

    //删除选中的记录
    const handleDeleteRows = () => {
      global
        .$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          if (data.selection_id_list.length == 0) {
            global.$message.error({
              message: '请选择要删除的数据',
              type: 'error',
            })
            return false
          }
          //删除条件 id数组
          let query = {
            _id: { $in: data.selection_id_list },
          }
          //删除操作
          await db.control.remove(query, { multi: true }).then((res: any) => {
            if (res > 0) {
              global.$message.success({
                message: '删除成功',
              })
            }
          })
          getControlList()
        })
        .catch(() => {
          global.$message.error({
            message: '已取消删除',
          })
        })
    }

    //搜索
    const onSubmit = () => {
      data.params.page = 1
      data.params.page_size = 10
      getControlList()
    }

    //重置
    const onReset = () => {
      searchFormRef.value.resetFields()
      onSubmit()
    }

    //分页数量切换
    const handleSizeChange = (val: any) => {
      data.params.page_size = val
      getControlList()
    }

    //切换页码
    const handleCurrentChange = (val: any) => {
      data.params.page = val
      getControlList()
    }

    //相当于mounted
    onMounted(async () => {
      await getControlList()
    })

    return {
      router,
      route,
      searchFormRef,
      table_head,
      type_options,
      ...toRefs(data),
      getControlList,
      handleSizeChange,
      handleRowDblClick,
      handleEdit,
      handleDelete,
      handleDeleteRows,
      onSubmit,
      onReset,
      handleCurrentChange,
      handleSelectionChange,
    }
  },
})
</script>
