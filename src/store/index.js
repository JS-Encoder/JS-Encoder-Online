import Vue from 'vue'
import Vuex from 'vuex'
import alertMsg from "@store/modules/alertMsg"
import cancelRequest from "@store/modules/cancelRequest"
import instanceMutations from './mutations/instance'
import instanceStates from './state/instance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...instanceStates,
    visibleDialogName: '' // 全局显示的 dialog name
  },
  mutations: {
    ...instanceMutations,
    setVisibleDialogName (state, newName) {
      state.visibleDialogName = newName
    }
  },
  actions: {
  },
  modules: {
    alertMsg,
    cancelRequest
  }
})
