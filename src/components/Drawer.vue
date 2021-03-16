<template>
  <el-drawer custom-class="drawer" title="我是标题" v-model="store.state.setting.show_drawer" :with-header="false">
    <el-row class="version">
      当前版本:{{package_json.version}}
    </el-row>
    <el-row class="block" type="flex" justify="space-between" align="middle">
      <el-col :span="12">
        <el-button size="mini" @click="handleClickChangeTheme(1)">切换主题1</el-button>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" @click="handleClickChangeTheme(2)">切换主题2</el-button>
      </el-col>
    </el-row>
    <el-row class="block" type="flex" justify="space-between" align="middle">
      <el-col :span="12">
        <el-button size="mini" @click="handleClickChangeTheme(3)">切换主题3</el-button>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" @click="handleClickChangeTheme(4)">切换主题4</el-button>
      </el-col>
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
    const handleClickChangeTheme = (type: number) => {
      document.body.className = 'theme' + type
    }

    return { store, package_json, handleClickChangeTheme }
  },
})
</script>
<style lang="scss">
.drawer {
  width: 300px;
  max-width: 300px;
  padding: 20px;
  padding-top: 60px;
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.version {
  font-size: 12px;
  color: $h3c;
}
</style>