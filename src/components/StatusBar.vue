<template>
  <div class="title_bar">
    <div class="title">
      <slot name="title">默认标题</slot>
    </div>
    <div class="tool_btn">
      <svg-icon name="mini" className="icon" id="minimize" />
      <svg-icon :name="max ? 'maxi_re' : 'maxi'" class="icon" id="maximize" />
      <svg-icon name="close" class="icon" id="winclose" />
    </div>
    <div class="title_line"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
//从渲染器进程到主进程的异步通信
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'StatusBar',
  setup() {
    //基本类型用这个
    let max = ref(false)
    onMounted(() => {
      // 关闭
      let close = document.getElementById('winclose')
      close?.addEventListener('click', function () {
        ipcRenderer.send('win-close', '')
      })
      // 最大化
      let maximize = document.getElementById('maximize')
      maximize?.addEventListener('click', function () {
        console.log(33)
        max.value = !max.value
        ipcRenderer.send('win-max', '')
      })
      // 最小化
      let minimize = document.getElementById('minimize')
      minimize?.addEventListener('click', function () {
        ipcRenderer.send('win-min', '')
      })
    })
    return { max }
  },
})
</script>

<style lang="scss" scoped>
.title_bar {
  width: calc(100% - 10px);
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999999;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  color: #ffffff;
  font-size: 12px;
  background: $theme;
  .title {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .tool_btn {
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      -webkit-app-region: no-drag;
      width: 16px;
      height: 16px;
      padding: 11px;
      font-weight: bold;
      fill: #ffffff;
      cursor: pointer;
      &:hover {
        background: $light-theme;
      }
      &:active {
        background: $deep-theme;
      }
    }
  }
  .title_line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    -webkit-app-region: no-drag;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    -webkit-app-region: no-drag;
  }
}
</style>
