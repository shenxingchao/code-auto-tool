<template>
  <el-drawer custom-class="drawer" title="我是标题" v-model="store.state.setting.show_drawer" :with-header="false">
    <el-row>
      当前版本:{{package_json.version}}
    </el-row>
    <el-row class="block">
      <el-button>切换主题</el-button>
    </el-row>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Drawer',
  setup() {
    const store = useStore()
    //获取版本号
    let package_json = require('../../package.json')
    return { store, package_json }
  },
})
</script>
