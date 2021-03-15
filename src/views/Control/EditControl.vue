<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Control/ControlList' }">控件管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑控件</el-breadcrumb-item>
      </el-breadcrumb>
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :md="18">
        <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" label-position="right" label-width="150px"
                 @submit.prevent>
          <el-form-item label="控件标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="控件标题" />
          </el-form-item>
          <el-form-item label="控件类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择控件类型">
              <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="控件内容" prop="content">
            <el-input type="textarea" autosize placeholder="控件模板变量有{$name},{$type},{$comment},{$value}"
                      v-model="ruleForm.content" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
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
import { useRouter, useRoute } from 'vue-router'
//数据类型
interface RuleForm {
  _id: string
  template_id: string
  title: string
  type: number | string
  content: string
  add_time: number
}

export default defineComponent({
  name: 'AddControl',
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
    const rules = {
      title: [
        {
          required: true,
          message: '请输入控件标题',
          trigger: 'blur',
        },
      ],
      type: [
        {
          required: true,
          message: '请选择控件类型',
          trigger: 'change',
        },
      ],
    }

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
    const ruleForm: RuleForm = reactive({
      _id: route.query._id as string,
      template_id: '',
      title: '',
      type: '',
      content: '',
      add_time: global.$moment().format('x'),
    })

    //表单refs dom对象
    const ruleFormRef: any = ref(null)

    //提交表单
    const submitForm = () => {
      ruleFormRef.value.validate(async (valid: any) => {
        if (valid) {
          let record = null
          //查找记录
          let query = {
            _id: { $ne: ruleForm._id },
            title: ruleForm.title,
          }
          await db.control.findOne(query).then((res: any) => {
            record = res
          })
          //如果没有记录
          if (!record) {
            let query = { _id: ruleForm._id }
            let update = {
              title: ruleForm.title,
              type: ruleForm.type,
              content: ruleForm.content,
            }

            //更新
            await db.control
              .update(query, { $set: update }, { upsert: true })
              .then((res: any) => {
                global.$message.success({
                  message: '保存成功',
                })
                router.back()
              })
              .catch((err: any) => {})
          } else {
            global.$message.error({
              message: '保存失败',
            })
          }
        } else {
          return false
        }
      })
    }

    //重置表单
    const resetForm = () => {
      ruleFormRef.value.resetFields()
    }

    //获取详情
    const getControlDetail = async () => {
      let query = { _id: ruleForm._id }
      await db.control.findOne(query).then((res: any) => {
        ruleForm.title = res.title
        ruleForm.type = res.type
        ruleForm.content = res.content
      })
    }

    onMounted(async () => {
      await getControlDetail()
    })

    return {
      router,
      route,
      rules,
      type_options,
      ruleForm,
      ruleFormRef,
      submitForm,
      resetForm,
      getControlDetail,
    }
  },
})
</script>
