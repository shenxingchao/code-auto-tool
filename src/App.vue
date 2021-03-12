<template>
  <StatusBar>
    <template v-slot:title>
      <div>代码自动生成工具</div>
    </template>
  </StatusBar>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import StatusBar from '@/components/StatusBar.vue'

export default defineComponent({
  components: {
    StatusBar,
  },
  setup() {},
})
</script>

<style lang="scss">
#app {
  width: 100%;
  padding-top: 40px;
  height: calc(100vh - 40px);
  overflow: auto;
}
</style>
