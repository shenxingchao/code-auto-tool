<template>
  <div class="app-container">
    <el-row class="btn-back" type="flex" justify="start">
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="12">
        <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" label-position="right" label-width="150px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="标题" />
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
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
} from 'vue'
import { useRouter } from 'vue-router'
//数据类型
interface ruleForm {
  title: string
}

export default defineComponent({
  setup() {
    //定义router
    const router = useRouter()

    //当前组件实例
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const db = internalInstance?.appContext.config.globalProperties.$db

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
    const ruleForm: ruleForm = reactive({
      title: '',
    })

    //表单refs dom对象
    const ruleFormRef: any = ref(null)

    //提交表单
    const submitForm = () => {
      ruleFormRef.value.validate((valid: any) => {
        if (valid) {
          //新增一条记录到数据库
          db.template
            .insert(ruleForm)
            .then((res: any) => {})
            .catch((err: any) => {})
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
