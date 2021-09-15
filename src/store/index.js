import Vue from 'vue'
import Vuex from 'vuex'
import alertMsg from "@store/modules/alertMsg"
import cancelRequest from "@store/modules/cancelRequest"
import instanceMutations from './mutations/instance'
import userMutations from './mutations/user'
import instanceStates from './state/instance'
import userStates from './state/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...instanceStates,
    ...userStates,
    visibleDialogName: '', // 全局显示的 dialog name
  },
  mutations: {
    ...instanceMutations,
    ...userMutations,
    setVisibleDialogName (state, newName) {
      state.visibleDialogName = newName
    },
  },
  actions: {
  },
  modules: {
    alertMsg,
    cancelRequest
  },
  getters: {
    instanceContent: (state) => {
      const { instanceCode, instanceExtLinks, compiledCode, prep } = state
      const headTags = state.instanceSetting.headTags
      return { instanceCode, instanceExtLinks, compiledCode, headTags, prep }
    },
    isSelfProfile (state) {
      // 判断当前访问的是否为自己的主页
      const { loginState, loginInfo, curUserDetail } = state
      return loginState && loginInfo.username === curUserDetail.username
    }
  }
})
