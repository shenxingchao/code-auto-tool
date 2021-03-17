<template>
  <div class="title_bar">
    <div class="title">
      <slot name="title">默认标题</slot>
    </div>
    <div class="tool_btn">
      <svg-icon name="setting" className="icon" @click="handleClickSetting" />
      <svg-icon name="mini" className="icon" @click="handleClickToolBtn('minimize')" />
      <svg-icon :name="max ? 'maxi_re' : 'maxi'" className="icon" @click="handleClickToolBtn('maximize')" />
      <svg-icon name="close" className="icon" @click="handleClickToolBtn('winclose')" />
    </div>
    <div class="title_line"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
//从渲染器进程到主进程的异步通信
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'StatusBar',
  setup() {
    const store = useStore()

    //基本类型用这个
    let drawer = ref(false)
    let max = ref(false)

    const handleClickSetting = () => {
      store.dispatch('handleChangeDrawer', !store.state.setting.show_drawer)
    }

    const handleClickToolBtn = (type: string) => {
      switch (type) {
        // 最小化
        case 'minimize':
          ipcRenderer.send('win-min', '')
          break
        // 最大化
        case 'maximize':
          ipcRenderer.send('win-max', '')
          break
        // 关闭
        case 'winclose':
          ipcRenderer.send('win-close', '')
          break

        default:
          break
      }
    }

    onMounted(() => {
      //监听最大化状态变化 去改变最大化或者是恢复按钮
      ipcRenderer.send('listen-maximize')
      ipcRenderer.on('maximize-change', (event, arg) => {
        max.value = arg
      })
    })
    return { store, drawer, max, handleClickSetting, handleClickToolBtn }
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
    width: 132px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      -webkit-app-region: no-drag;
      width: 20px;
      height: 20px;
      padding: 10px;
      fill: #ffffff;
      cursor: pointer;
      &:hover {
        background: $light-theme;
      }
      &:active {
        background: $deep-theme;
      }

      &:first-child {
        width: 28px;
        height: 28px;
        padding: 6px;
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
