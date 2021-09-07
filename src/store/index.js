import Vue from 'vue'
import Vuex from 'vuex'
import alertMsg from "@store/modules/alertMsg"
import cancelRequest from "@store/modules/cancelRequest"
import instanceMutations from './mutations/instance'
import userMutations from './mutations/user'
import instanceStates from './state/instance'
import user from './state/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...instanceStates,
    ...user,
    visibleDialogName: '' // 全局显示的 dialog name
  },
  mutations: {
    ...instanceMutations,
    ...userMutations,
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
