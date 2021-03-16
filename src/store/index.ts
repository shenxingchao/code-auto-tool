import { createStore } from 'vuex'

export default createStore({
  state: {
    setting: {
      show_drawer: false //是否显示抽屉
    }
  },
  mutations: {
    SET_SHOW_DRAWER: (state, bool) => {
      state.setting.show_drawer = bool
    }
  },
  actions: {
    handleChangeDrawer({ commit }, bool) {
      commit('SET_SHOW_DRAWER', bool)
    }
  },
  modules: {}
})
