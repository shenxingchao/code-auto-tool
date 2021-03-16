<template>
  <StatusBar>
    <template v-slot:title>
      <div class="title" @click="router.push('/')">代码自动生成工具</div>
    </template>
  </StatusBar>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import StatusBar from '@/components/StatusBar.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    StatusBar,
  },
  setup() {
    const router = useRouter()
    return { router }
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
</style>
<style lang="scss" scoped>
.title {
  cursor: pointer;
  -webkit-app-region: no-drag;
}
</style>
