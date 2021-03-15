<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Make/MakeStep' }">生成</el-breadcrumb-item>
        <el-breadcrumb-item>生成步骤</el-breadcrumb-item>
      </el-breadcrumb>
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-steps :active="step_active" align-center finish-status="success">
      <el-step title="选择模板"></el-step>
      <el-step title="设置变量"></el-step>
      <el-step title="下载代码"></el-step>
    </el-steps>
    <div class="block" v-if="step_active == 0">
      <el-row type="flex" justify="center">
        <el-col :sm="16" :md="10">
          <el-form ref="stepOneFormRef" label-position="right" label-width="150px" @submit.prevent>
            <el-form-item label="选择模板" prop="template_id">
              <el-select v-model="ruleForm.template_id" placeholder="请选择模板" @change="handleChangeTemplate" clearable>
                <el-option v-for="item in template_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="block" v-if="step_active == 1">
      <el-row type="flex" justify="center">
        <el-col :md="16">
          <el-row v-for="(item,index) in ruleForm.list" :key="item.id" class="block" type="flex" :gutter="24"
                  align="middle">
            <el-col :span="6">
              <el-select v-model="item._id" placeholder="选择控件">
                <el-option v-for="item in control_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.name" placeholder="变量名" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.type" placeholder="类型" />
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.value" placeholder="默认值" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.comment" placeholder="注释" />
            </el-col>
            <el-col :span="2" v-if="index!=0">
              <el-button type="danger" icon="el-icon-minus" size="mini" @click="handleDeleteField(index)">
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="block" type="flex" justify="center">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddField">添加字段
        </el-button>
      </el-row>
    </div>
    <div class="block">
      <el-row type="flex" justify="center" align="middle">
        <el-button v-if="step_active!=0" @click="step_active--">上一步</el-button>
        <el-button v-if="step_active < 2" :disabled="step_active==0&&ruleForm.template_id==''" @click="step_active++">
          下一步
        </el-button>
        <el-button v-if="step_active == 2" type="warning">生成代码</el-button>
      </el-row>
    </div>
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

//option label-value类型
interface LabelValue {
  label: string
  value: string
}

//控件类型
interface Control {
  _id: string //控件id
  name: string //变量名
  type: string //变量类型
  value: string //默认值
  comment: string //注释
}

//数据类型
interface RuleForm {
  template_id: string
  list: Control[]
}

//数据
interface Data {
  step_active: number
  template_options: LabelValue[]
  control_options: LabelValue[]
  ruleForm: RuleForm
}

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

    //数据对象
    let data: Data = reactive({
      step_active: 0,
      template_options: [],
      control_options: [],
      ruleForm: {
        template_id: '',
        list: [
          {
            _id: '',
            name: '',
            type: '',
            value: '',
            comment: '',
          },
        ],
      },
    })

    //获取列表
    const getTemplateList = async () => {
      //搜索条件
      let query: any = {}

      //分页获取记录
      await db.template.find(query, { add_time: -1 }).then((res: any) => {
        res.forEach((element: any) => {
          data.template_options.push({
            label: element.title,
            value: element._id,
          })
        })
      })
    }

    //切换模板 赋值控件选项
    const handleChangeTemplate = async (val: string) => {
      //清空控件
      data.control_options = []
      //清空选择的控件
      data.ruleForm.list = [
        {
          _id: '',
          name: '',
          type: '',
          value: '',
          comment: '',
        },
      ]

      let template_id = val
      //查询条件 只显示基础控件
      let query = {
        template_id: template_id,
        type: 1,
      }
      //查找控件
      await db.control.find(query, { add_time: -1 }).then((res: any) => {
        res.forEach((element: any) => {
          data.control_options.push({
            label: element.title,
            value: element._id,
          })
        })
      })
    }

    //添加字段
    const handleAddField = () => {
      data.ruleForm.list.push({
        _id: '',
        name: '',
        type: '',
        value: '',
        comment: '',
      })
    }

    //删除字段
    const handleDeleteField = (key: number) => {
      data.ruleForm.list
      data.ruleForm.list = data.ruleForm.list.filter(
        (item, index) => index != key
      )
    }

    //相当于mounted
    onMounted(async () => {
      await getTemplateList()
    })

    return {
      router,
      route,
      ...toRefs(data),
      getTemplateList,
      handleChangeTemplate,
      handleAddField,
      handleDeleteField,
    }
  },
})
</script>
