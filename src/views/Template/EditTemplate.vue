<template>
  <div class="app-container">
    <el-row class="tool-btn-group" type="flex" justify="start">
      <svg-icon name="back" className="icon" @click="router.back()" />
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="12">
        <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" label-position="right" label-width="150px"
                 @submit.prevent>
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="基础模板内容" prop="base_content">
            <el-input type="textarea" autosize placeholder="请输入基础模板内容" v-model="ruleForm.base_content" />
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
  title: string
  base_content: string
  add_time: number
}

export default defineComponent({
  name: 'AddTemplate',
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
          message: '请输入模板标题',
          trigger: 'blur',
        },
      ],
    }

    //数据对象
    const ruleForm: RuleForm = reactive({
      _id: route.query._id as string,
      title: '',
      base_content: '',
      add_time: global.$moment().format('YYYY-MM-DD h:mm:ss'),
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
          await db.template.findOne(query).then((res: any) => {
            record = res
          })
          //如果没有记录
          if (!record) {
            let query = { _id: ruleForm._id }
            let update = {
              title: ruleForm.title,
              base_content: ruleForm.base_content,
            }
            console.log(update)
            //更新
            await db.template
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
    const getTemplateDetail = async () => {
      let query = { _id: ruleForm._id }
      await db.template.findOne(query).then((res: any) => {
        ruleForm.title = res.title
        ruleForm.base_content = res.base_content
      })
    }

    onMounted(async () => {
      await getTemplateDetail()
    })

    return {
      router,
      route,
      rules,
      ruleForm,
      ruleFormRef,
      submitForm,
      resetForm,
      getTemplateDetail,
    }
  },
})
</script>
