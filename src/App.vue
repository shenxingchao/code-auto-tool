<template>
  <StatusBar>
    <template v-slot:title>
      <div class="title" @click="router.push('/')">代码自动生成工具</div>
    </template>
  </StatusBar>
  <el-drawer custom-class="drawer" title="我是标题" v-model="store.state.setting.show_drawer" :with-header="false">
  </el-drawer>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import StatusBar from '@/components/StatusBar.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    StatusBar,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    return { router, store }
  },
})
</script>

<style lang="scss">
#app {
  width: 100%;
  padding-top: 40px;
  height: calc(100vh - 40px);
  overflow: auto;
  background: $bg;
}
.drawer {
  width: 40%;
  max-width: 300px;
  padding-top: 40px !important;
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.title {
  cursor: pointer;
  -webkit-app-region: no-drag;
}
</style>
