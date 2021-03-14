<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Template/TemplateList' }">模板管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加模板</el-breadcrumb-item>
      </el-breadcrumb>
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="18">
        <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" label-position="right" label-width="150px"
                 @submit.prevent>
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="基础模板内容" prop="base_content">
            <el-input type="textarea" autosize
                      placeholder="请输入基础模板内容,固定基础控件变量{$content}，循环控件变量名称可以自定义，比如{$for1},那么循环控件的名称就是这个模板变量"
                      v-model="ruleForm.base_content" />
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
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
//数据类型
interface RuleForm {
  title: string
  base_content: string
  add_time: number
}

export default defineComponent({
  name: 'AddTemplate',
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
    const rules = {
      title: [
        {
          required: true,
          message: '请输入模板标题',
          trigger: 'blur',
        },
      ],
    }

    //数据对象
    const ruleForm: RuleForm = reactive({
      title: '',
      base_content: '',
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
            title: ruleForm.title,
          }
          await db.template.findOne(query).then((res: any) => {
            record = res
          })
          //如果没有记录
          if (!record) {
            //新增一条记录到数据库
            await db.template
              .insert(ruleForm)
              .then((res: any) => {
                global.$message.success({
                  message: '添加成功',
                })
                router.back()
              })
              .catch((err: any) => {})
          } else {
            global.$message.error({
              message: '添加失败，模板名称重复',
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

    return { router, rules, ruleForm, ruleFormRef, submitForm, resetForm }
  },
})
</script>
